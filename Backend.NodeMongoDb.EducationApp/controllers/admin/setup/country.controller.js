'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const adminMstCountryClcts = require('../../../models/admin/setup/country.model');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
var validator = require('validator');

const GetCountryDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Country']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_CountryId = req.query.CountryId;
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
        if (iPK_CountryId) {
            if (!validator.isMongoId(iPK_CountryId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(CountryId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }

        var DataList = null;
        let pipeline = [];


        pipeline.push(
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
        if (iPK_CountryId) {
            pipeline.push({ $match: { _id: ObjectId(iPK_CountryId) } });
        }
        else if (cSearchBy && cSearchValue) {
            if (cSearchBy == 'CountryName') {
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
        DataList = await adminMstCountryClcts.aggregate(pipeline)
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


        var TotalCurrentMonth = await adminMstCountryClcts.find({
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
        var TotalActive = await adminMstCountryClcts.find({
            $and: [
                { IsActive: true },
                { IsDeleted: { $in: [false, null] } }
            ]
        }).count();

        var TotalInActive = await adminMstCountryClcts.find({
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
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "COUNTRY_MASTER" }, { "_id": 0, FormCode: 0 });

        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "COUNTRY_MASTER" });

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
        //    request.input('iPK_CountryId', sql.BigInt, iPK_CountryId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), cSearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), cSearchValue);
        //    request.execute("[dbo].[USP_SvcGetCountryDetails]", function (err, recordset) {
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
        //#endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditCountryDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Country']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_CountryId = req.body.CountryId;
        var cCountryName = req.body.CountryName;
        var bIsActive = req.body.IsActive;
        var CreatedBy = req.body.CreatedBy;

        if (Number(cCountryName) === '') {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryName) body parameters must be required and valid!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (iPK_CountryId) {
            if (!validator.isMongoId(iPK_CountryId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(CountryId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            var objUpdate = await adminMstCountryClcts.findById(iPK_CountryId);
            if (!objUpdate) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = "Invalid ID ? Country ID does not exists!";
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

        if (iPK_CountryId == "") {
            const objAdminMstCountryClcts = new adminMstCountryClcts({
                CountryName: cCountryName,
                IsActive: bIsActive,
                CreatedBy: CreatedByUser ? CreatedByUser._id : null,
                CreatedDateTime: (new Date()),
            });
            await objAdminMstCountryClcts.save()
                .then(item => {
                    ServiceResult.Message = "New Country details inserted successfully!";
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
            await adminMstCountryClcts.findByIdAndUpdate(
                iPK_CountryId,
                {
                    CountryName: cCountryName,
                    UpdatedBy: CreatedByUser ? CreatedByUser._id : null,
                    UpdatedDateTime: (new Date()),
                },
                { new: true, useFindAndModify: false }
            )
                .then(item => {
                    ServiceResult.Message = "Country details updated successfully!";
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
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_CountryId', sql.BigInt, iPK_CountryId);
        //    request.input('cCountryName', sql.NVarChar(100), cCountryName);
        //    request.input('bIsActive', sql.BIT, bIsActive);
        //    request.input('iUserId', sql.BIGINT, iUserId);

        //    request.execute("[dbo].[USP_SvcAddEditCountry]", function (err, recordset) {
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

const DeleteCountrysDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Country']
        #swagger.description = ''
    */
    //debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_CountryId = req.query.CountryId;
        var DeletedBy = req.query.DeletedBy;

        if (!iPK_CountryId || !DeletedBy) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryId & DeletedBy) query params must be required a number!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iPK_CountryId) || !validator.isMongoId(DeletedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUser = DeletedBy ? await adminMstUserClcts.findById(DeletedBy) : "";
        await adminMstCountryClcts.findByIdAndUpdate(
            iPK_CountryId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUser ? DeletedByUser._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "Country details deleted successfully!";
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
        //if ((Number(iPK_CountryId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_CountryId)) || isNaN(Number(iUserId)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(CountryId & DeletedBy) query params must be required a number & grater than zero!';
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

        //    request.input('iPK_CountryId', sql.BigInt, iPK_CountryId);
        //    request.input('iUserId', sql.BigInt, iUserId);

        //    request.execute("[dbo].[USP_SvcDeleteCountry]", function (err, recordset) {
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
        //#region
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}


module.exports = {
    GetCountryDetails,
    AddEditCountryDetails,
    DeleteCountrysDetails
}