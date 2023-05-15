'use strict';
const config = require('../../../config');
const sql = require('mssql');
//const mongoose = require('mongoose');
const ServiceResult = require('../../../models/serviceResult.model');
const adminMstFormClcts = require('../../../models/admin/setup/form.model');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
var validator = require('validator');
const CommonFuncs = require('../../../common/common.funcs');

const GetFormDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Form']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_FormId = req.query.FormId;
        var RowperPage = req.query.RowPerPage;
        var CurrentPage = req.query.CurrentPage;
        var cSearchBy = req.query.SearchBy;
        var cSearchValue = req.query.SearchValue;
        if ((Number(RowperPage) <= 0 || Number(CurrentPage) <= 0) || (isNaN(Number(RowperPage)) || isNaN(Number(CurrentPage)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RowPerPage & CurrentPage) query params must be required a number & grater than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (iPK_FormId) {
            if (!validator.isMongoId(iPK_FormId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(FormId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        var DataList = null;
        let pipeline = [];


        pipeline.push(
            {
                $lookup: {
                    from: "admin_mstform_clcts",
                    localField: "ParentId",
                    foreignField: "_id",
                    as: "ParentId"
                }
            },
            {
                $set: {
                    ParentId: { $arrayElemAt: ["$ParentId._id", 0] },
                    ParentFormName: { $arrayElemAt: ["$ParentId.FormName", 0] },
                    ComponentPath: "$SPA_ComponentHref",
                    ActionName: "$LandingComponentName",
                }
            },
            {
                $addFields: {
                    "Status": {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: [
                                            "$IsActive",
                                            true
                                        ]
                                    },
                                    then: "Active"
                                },
                                {
                                    case: {
                                        $eq: [
                                            "$IsActive",
                                            false
                                        ]
                                    },
                                    then: "Inactive"
                                },

                            ],
                            default: {
                                $toString: "$IsActive"
                            }
                        }
                    }
                }
            },
        );
        /** An if check prior to forming query */
        if (iPK_FormId) {
            pipeline.push({ $match: { _id: ObjectId(iPK_FormId) } });
        }
        else if (cSearchBy && cSearchValue) {
            if (cSearchBy == 'FormName') {
                pipeline.push({
                    $match: { FormName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'ComponentName') {
                pipeline.push({
                    $match: { ComponentName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'Area') {
                pipeline.push({
                    $match: { Area: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'LandingComponentName') {
                pipeline.push({
                    $match: { LandingComponentName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
        }
        pipeline.push(
            {
                "$set": {
                    // Modify a field + add a new field
                    "PK_ID": "$_id",
                    CreatedDateTime: {
                        $dateToString: {
                            format: "%d/%m/%Y %H:%M:%S:%L%z",
                            date: "$CreatedDateTime"
                        }
                    }
                }
            },

            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { $sort: { CreatedDateTime: -1 } }
        );
        /*Default piplines*/
        pipeline.push({
            $match: { IsDeleted: { $in: [false, null] } }
        });

        pipeline.push({ $skip: Number(RowperPage) * (CurrentPage - 1) });
        pipeline.push({ $limit: Number(RowperPage) });
        DataList = await adminMstFormClcts.aggregate(pipeline)
            .then(items => {
                return items;
            })
            .catch(err => {
                ServiceResult.Message = "API Internal Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = err.message;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            });


        var TotalCurrentMonth = await adminMstFormClcts.find({
            $and: [
                { IsActive: true },
                { IsDeleted: { $in: [false, null] } },
                {
                    '$match': {
                        '$expr': {
                            '$eq': [
                                { "$dateToString": { format: "%Y-%m-%d", date: "$CreatedDateTime" } },
                                { "$dateToString": { format: "%Y-%m-%d", date: new Date() } },
                            ]
                        }
                    }
                }
            ]
        }).count();
        var TotalActive = await adminMstFormClcts.find({
            $and: [
                { IsActive: true },
                { IsDeleted: { $in: [false, null] } }
            ]
        }).count();

        var TotalInActive = await adminMstFormClcts.find({
            $and: [
                { IsActive: false },
                { IsDeleted: { $in: [false, null] } }
            ]
        }).count();
        var TotalItem = TotalActive + TotalInActive;
        var CountArray = {
            TotalItem: TotalItem,
            TotalCurrentMonth: TotalCurrentMonth,
            TotalActive: TotalActive,
            TotalInActive: TotalInActive
        };
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "FORM_MASTER" }, { "_id": 0, FormCode: 0});

        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "FORM_MASTER" });

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = {
            DataList: DataList,
            CountArray: CountArray,
            HeaderList: HeaderList,
            SearchTermList: SearchTermList,
        };
        return res.send(ServiceResult);

        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iPK_FormId', sql.BigInt, iPK_FormId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), cSearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), cSearchValue);
        //    request.execute("[dbo].[USP_SvcGetFormDetails]", function (err, recordset) {
        //        if (err) {
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err.message;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //        sql.close();

        //        if (recordset) {
        //            if (recordset.recordsets[0][0].Message_Id == 1) {
        //                try {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = {
        //                        DataList: recordset.recordsets[1],
        //                        CountArray: recordset.recordsets[2][0],
        //                        HeaderList: recordset.recordsets[3][0],
        //                        SearchTermList: recordset.recordsets[4],
        //                    };
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    ServiceResult.Message = "Failed to parse api response!";
        //                    ServiceResult.Description = error.message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        }
        //        else {
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditFormDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Form']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_FormId = req.body.FormId;
        var cFormName = req.body.FormName;
        var ComponentName = req.body.ComponentName;
        var SPA_ComponentHref = req.body.ComponentPath;
        var LandingComponentName = req.body.LandingComponentName;
        var iFK_ParentId = req.body.ParentFormId;
        //var iFK_SolutionId = req.body.SolutionId;
        var cClassName = req.body.ClassName;
        var cArea = req.body.Area;
        var bIsActive = req.body.IsActive;
        var CreatedBy = req.body.CreatedBy;
        var cPlatFormType = req.body.PlatFormType;
        if (iPK_FormId) {
            if (!validator.isMongoId(iPK_FormId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(FormId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        if (!validator.isMongoId(CreatedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CreatedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (iPK_FormId) {
            var objUpdate = await adminMstFormClcts.findById(iPK_FormId);
            if (!objUpdate) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = "Invalid ID ? Form ID does not exists!";
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        var ParentForm = iFK_ParentId ? await adminMstFormClcts.findById(iFK_ParentId) : "";
        var CreatedByUser = CreatedBy ? await adminMstUserClcts.findById(CreatedBy) : "";



        res.setHeader('Content-Type', 'application/json');
        if (iPK_FormId == "") {
            const objAdminMstFormClcts = new adminMstFormClcts({
                //PK_FormId        : iPK_FormId,
                FormName: cFormName,
                ComponentName: ComponentName,
                LandingComponentName: LandingComponentName,
                SPA_ComponentHref: SPA_ComponentHref,
                ParentId: ParentForm ? ParentForm._id : null,
                //FK_SolutionId    : iFK_SolutionId,
                ClassName: cClassName,
                Area: cArea,
                IsActive: bIsActive,
                CreatedBy: CreatedByUser ? CreatedByUser._id : null,
                CreatedDateTime: (new Date()),
                PlatFormType: cPlatFormType
            });
            await objAdminMstFormClcts.save()
                .then(item => {
                    ServiceResult.Message = "New Form details inserted successfully!";
                    ServiceResult.Result = true;
                    ServiceResult.Description = null;
                    ServiceResult.Data = item;
                    return res.send(ServiceResult);
                })
                .catch(err => {
                    ServiceResult.Message = "API Internal Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = err.message;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                });
        }
        else {
            await adminMstFormClcts.findByIdAndUpdate(
                iPK_FormId,
                {
                    //PK_FormId        : iPK_FormId,
                    FormName: cFormName,
                    ComponentName: ComponentName,
                    SPA_ComponentHref: SPA_ComponentHref,
                    LandingComponentName: LandingComponentName,
                    ParentId: ParentForm ? ParentForm._id : null,
                    //FK_SolutionId    : iFK_SolutionId,
                    ClassName: cClassName,
                    Area: cArea,
                    IsActive: bIsActive,
                    UpdatedBy: CreatedByUser ? CreatedByUser._id : null,
                    UpdatedDateTime: (new Date()),
                    PlatFormType: cPlatFormType
                },
                { new: true, useFindAndModify: false }
            )
                .then(item => {
                    ServiceResult.Message = "Form details updated successfully!";
                    ServiceResult.Result = true;
                    ServiceResult.Description = null;
                    ServiceResult.Data = item;
                    return res.send(ServiceResult);
                })
                .catch(err => {
                    ServiceResult.Message = "API Internal Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = err.message;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                });
        }
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_FormId', sql.BigInt, iPK_FormId);
        //    request.input('cFormName', sql.NVarChar(100), cFormName);
        //    request.input('cControllerName', sql.NVarChar(100), cControllerName);
        //    request.input('cSPA_ComponentHref', sql.NVarChar(500), SPA_ComponentHref);
        //    request.input('cActionName', sql.NVarChar(30), cActionName);
        //    request.input('iFK_ParentId', sql.BigInt, iFK_ParentId);
        //    request.input('iFK_SolutionId', sql.BigInt, iFK_SolutionId);
        //    request.input('cClassName', sql.NVarChar(30), cClassName);
        //    request.input('cArea', sql.NVarChar(30), cArea);
        //    request.input('bIsActive', sql.BIT, bIsActive);
        //    request.input('iUserId', sql.BIGINT, iUserId);
        //    request.input('cImageName', sql.NVarChar(200), cImageName);
        //    request.input('cPlatFormType', sql.NVarChar(30), cPlatFormType);


        //    request.execute("[dbo].[USP_SvcAddEditForm]", function (err, recordset) {
        //        try {
        //            if (err) {
        //                console.log(err);
        //                sql.close();
        //                ServiceResult.Message = "Failed to parse api response!";
        //                ServiceResult.Description = err.message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //            sql.close();
        //            if (recordset) {
        //                if (recordset.recordsets[0][0].Message_Id == 1) {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //                else {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = "Failed to parse api response!";
        //                ServiceResult.Result = false;
        //                ServiceResult.Description = null;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        } catch (e) {
        //            ServiceResult.Message = 'API Internal Error!';
        //            ServiceResult.Description = null;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            ServiceResult.Description = JSON.stringify(e.message);
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const DeleteFormsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Form']
        #swagger.description = ''
    */
    debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_FormId = req.query.FormId;
        var DeletedBy = req.query.DeletedBy;

        if (!iPK_FormId || !DeletedBy) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormId & DeletedBy) query params must be required a number!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iPK_FormId) || !validator.isMongoId(DeletedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUser = DeletedBy ? await adminMstUserClcts.findById(DeletedBy) : "";
        await adminMstFormClcts.findByIdAndUpdate(
            iPK_FormId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUser ? DeletedByUser._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "Form details deleted successfully!";
                ServiceResult.Result = true;
                ServiceResult.Description = null;
                ServiceResult.Data = item;
                return res.send(ServiceResult);
            })
            .catch(err => {
                ServiceResult.Message = "API Internal Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = err.message;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            });

        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_FormId', sql.BigInt, iPK_FormId);
        //    request.input('iUserId', sql.BigInt, iUserId);

        //    request.execute("[dbo].[USP_SvcDeleteForm]", function (err, recordset) {
        //        if (err) {
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err.message;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //        sql.close();
        //        if (recordset) {
        //            if (recordset.recordsets[0][0].Message_Id == 1) {
        //                try {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    ServiceResult.Message = "Failed to parse api response!";
        //                    ServiceResult.Description = error.message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        }
        //        else {
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}


module.exports = {
    GetFormDetails,
    AddEditFormDetails,
    DeleteFormsDetails
}