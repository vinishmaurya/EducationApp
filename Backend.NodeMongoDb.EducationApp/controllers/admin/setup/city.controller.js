'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const adminMstCityClcts = require('../../../models/admin/setup/city.model');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
var validator = require('validator');


const GetCityDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.City']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_CityId = req.query.CityId;
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


        if (iPK_CityId) {
            if (!validator.isMongoId(iPK_CityId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(CityId) query params must be a valid mongo id!';
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
                    from: "admin_mstcountry_clcts",
                    localField: "CountryId",
                    foreignField: "_id",
                    as: "CountryId"
                }
            },
            {
                $lookup: {
                    from: "admin_mststate_clcts",
                    localField: "StateId",
                    foreignField: "_id",
                    as: "StateId"
                }
            },
            {
                $set: {
                    CountryId: { $arrayElemAt: ["$CountryId._id", 0] },
                    CountryName: { $arrayElemAt: ["$CountryId.CountryName", 0] },
                    StateId: { $arrayElemAt: ["$StateId._id", 0] },
                    StateName: { $arrayElemAt: ["$StateId.StateName", 0] }
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
        if (iPK_CityId) {
            pipeline.push({ $match: { _id: ObjectId(iPK_CityId) } });
        }
        else if (cSearchBy && cSearchValue) {
            if (cSearchBy == 'CityName') {
                pipeline.push({
                    $match: { CityName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'StateName') {
                pipeline.push({
                    $match: { StateName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'CountryName') {
                pipeline.push({
                    $match: { CountryName: { $regex: cSearchValue, $options: 'i' } }
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
            { $sort: { CreatedDateTime: 1 } }
        );
        /*Default piplines*/
        pipeline.push({
            $match: { IsDeleted: { $in: [false, null] } }
        });

        pipeline.push({ $skip: Number(RowperPage) * (CurrentPage - 1) });
        pipeline.push({ $limit: Number(RowperPage) });
        DataList = await adminMstCityClcts.aggregate(pipeline)
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


        var TotalCurrentMonth = await adminMstCityClcts.find({
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
        var TotalActive = await adminMstCityClcts.find({
            $and: [
                { IsActive: true },
                { IsDeleted: { $in: [false, null] } }
            ]
        }).count();
        
        var TotalInActive = await adminMstCityClcts.find({
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
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "CITY_MASTER" }, { "_id": 0, FormCode: 0 });

        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "CITY_MASTER" });

        //DataList = CommonFuncs.funcParseInnerObject(JSON.parse(JSON.stringify(DataList)));


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

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iPK_CityId', sql.BigInt, iPK_CityId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), cSearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), cSearchValue);
        //    request.execute("[dbo].[USP_SvcGetCityDetails]", function (err, recordset) {
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
        //#region
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditCityDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.City']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iFK_CountryId = req.body.CountryId;
        var iFK_StateId = req.body.StateId;
        var iPK_CityId = req.body.CityId;
        var cCityName = req.body.CityName;
        var bIsActive = req.body.IsActive === "true" ? true : false;
        var CreatedBy = req.body.CreatedBy;

        if (
            Number(cCityName) === '' 
        ) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CityName, CreatedBy) body parameters must be required and valid!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iFK_CountryId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }

        if (iPK_CityId) {
            if (!validator.isMongoId(iPK_CityId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(CityId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            var objUpdate = await adminMstCityClcts.findById(iPK_CityId);
            if (!objUpdate) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = "Invalid ID ? City ID does not exists!";
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

        res.setHeader('Content-Type', 'application/json');

        var CreatedByUser = CreatedBy ? await adminMstUserClcts.findById(CreatedBy) : "";

        if (iPK_CityId == "") {
            const objAdminMstCityClcts = new adminMstCityClcts({
                CityName: cCityName,
                CountryId: iFK_CountryId,
                StateId: iFK_StateId,
                IsActive: bIsActive,
                CreatedBy: CreatedByUser ? CreatedByUser._id : null,
                CreatedDateTime: (new Date()),
            });
            await objAdminMstCityClcts.save()
                .then(item => {
                    ServiceResult.Message = "New City details inserted successfully!";
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
            await adminMstCityClcts.findByIdAndUpdate(
                iPK_CityId,
                {
                    CityName: cCityName,
                    CountryId: iFK_CountryId,
                    StateId: iFK_StateId,
                    UpdatedBy: CreatedByUser ? CreatedByUser._id : null,
                    UpdatedDateTime: (new Date()),
                },
                { new: true, useFindAndModify: false }
            )
                .then(item => {
                    ServiceResult.Message = "City details updated successfully!";
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

        //#region SQL DB
        //if (isNaN(Number(iPK_CityId)) || isNaN(Number(iFK_CountryId)) || isNaN(Number(iFK_CityId))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(CityId, CountryId, CityId) body parameters must be contains valid numbers or zero!';
        //    ServiceResult.Result = false;
        //    ServiceResult.Data = null;
        //    return res.send(ServiceResult);
        //}
        //if (Number(iFK_CountryId) <= 0 || Number(iFK_CityId) <= 0) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(CountryId, CityId) body parameters must be grater than zero!';
        //    ServiceResult.Result = false;
        //    ServiceResult.Data = null;
        //    return res.send(ServiceResult);
        //}
        //res.setHeader('Content-Type', 'application/json');
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iFK_CountryId', sql.BigInt, iFK_CountryId);
        //    request.input('iFK_CityId', sql.BigInt, iFK_CityId);
        //    request.input('iPK_CityId', sql.BigInt, iPK_CityId);
        //    request.input('cCityName', sql.NVarChar(100), cCityName);
        //    request.input('bIsActive', sql.BIT, bIsActive);
        //    request.input('iUserId', sql.BIGINT, iUserId);

        //    request.execute("[dbo].[USP_SvcAddEditCity]", function (err, recordset) {
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
        //#endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const DeleteCitysDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.City']
        #swagger.description = ''
    */
    debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_CityId = req.query.CityId;
        var DeletedBy = req.query.DeletedBy;

        if (!iPK_CityId || !DeletedBy) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CityId & DeletedBy) query params must be required a number!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iPK_CityId) || !validator.isMongoId(DeletedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CityId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUser = DeletedBy ? await adminMstUserClcts.findById(DeletedBy) : "";
        await adminMstCityClcts.findByIdAndUpdate(
            iPK_CityId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUser ? DeletedByUser._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "City details deleted successfully!";
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

        //#region SQL DB
        //if ((Number(iPK_CityId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_CityId)) || isNaN(Number(iUserId)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(CityId & DeletedBy) query params must be required a number & grater than zero!';
        //    ServiceResult.Result = false;
        //    ServiceResult.Data = null;
        //    return res.send(ServiceResult);
        //}
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_CityId', sql.BigInt, iPK_CityId);
        //    request.input('iUserId', sql.BigInt, iUserId);

        //    request.execute("[dbo].[USP_SvcDeleteCity]", function (err, recordset) {
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
        //#endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}


module.exports = {
    GetCityDetails,
    AddEditCityDetails,
    DeleteCitysDetails
}