'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const adminLkpCategoryClcts = require('../../../models/admin/setup/category.model');
const adminMstAccountClcts = require('../../../models/admin/setup/account.model');
const adminMstRoleClcts = require('../../../models/admin/setup/Role.model');
const adminMstCountryClcts = require('../../../models/admin/setup/country.model');
const adminMstStateClcts = require('../../../models/admin/setup/state.model');
const adminMstCityClcts = require('../../../models/admin/setup/city.model');
const adminMstFormClcts = require('../../../models/admin/setup/form.model');


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var validator = require('validator');

const GetAllCategoryList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        var CategoryIdInfo = await adminLkpCategoryClcts.aggregate([
            { $match: { IsActive: true } },
            {
                "$set": {
                    // Modify a field + add a new field
                    "PK_CategoryId": "$_id"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "IsActive",
                    "_id",
                    "__v"
                ]
            }
        ])
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = CategoryIdInfo;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.execute("[dbo].[USP_SvcGetAllCategoryList]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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

const GetAllRoleList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        let RoleName = req.query.RoleName ? req.query.RoleName : '';
        let CategoryId = req.query.CategoryId ? req.query.CategoryId : '';
        let AccountId = req.query.AccountId ? req.query.AccountId : '';

        res.setHeader('Content-Type', 'application/json');
        if (CategoryId) {
            if (!validator.isMongoId(CategoryId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(CategoryId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        if (AccountId) {
            if (!validator.isMongoId(AccountId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(AccountId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        let pipeline = [];

        if (RoleName) {
            pipeline.push({ $match: { RoleName: { $regex: RoleName, $options: 'i' } } });
        }
        if (CategoryId) {
            pipeline.push({ $match: { CategoryId: ObjectId(CategoryId) } });
        }
        if (AccountId) {
            pipeline.push({ $match: { AccountId: ObjectId(AccountId) } });
        }
        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "PK_RoleId": "$_id",
                    "RoleName": "$RoleName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "PK_RoleId": 1, "RoleName": { "$ifNull": ["$RoleName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var RoleInfo = await adminMstRoleClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = RoleInfo;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('cRoleName', sql.NVarChar, RoleName);
        //    request.input('iFK_CategoryId', sql.BigInt, CategoryId);
        //    request.input('iFK_AccountId', sql.BigInt, AccountId);

        //    request.execute("[dbo].[USP_SvcGetAllRoleList]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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


const GetAllAccountList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        let pipeline = [];

        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "AccountId": "$_id",
                    "AccountName": "$AccountName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "AccountId": 1, "AccountName": { "$ifNull": ["$AccountName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var AccountInfo = await adminMstAccountClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = AccountInfo;
        return res.send(ServiceResult);
        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.execute("[dbo].[USP_SvcGetAllAccountList]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err.message;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //        sql.close();
        //        if (recordset) {
        //            console.log(JSON.stringify(recordset.recordsets));
        //            if (recordset.recordsets[0][0].Message_Id == 1) {

        //                try {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = recordset.recordsets[1];
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


const GetAllParentFormsList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        let pipeline = [];
       
        pipeline.push(
            {
                $match: {
                    IsActive: true,
                    IsDeleted: { $in: [false, null] },
                    ParentId:null
                }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "FormId": "$_id",
                    "FormName": "$FormName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "FormId": 1, "FormName": { "$ifNull": ["$FormName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var FormInfo = await adminMstFormClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = FormInfo;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.execute("[dbo].[USP_SvcGetAllParentFormsList]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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

const AllAccountsListByCategory = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        let CategoryId = req.query.CategoryId;
        let IsParentAccount = req.query.IsParentAccount ? req.query.IsParentAccount : 'false';

        if (!validator.isMongoId(CategoryId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CategoryId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (
            !['true', 'false'].includes(IsParentAccount)
        ) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = CategoryId + IsParentAccount + '(IsParentAccount) query parameters contains invalid values!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        IsParentAccount = IsParentAccount == "true" ? true : false;

        let pipeline = [];
        pipeline.push({ $match: { CategoryId: ObjectId(CategoryId) } });
        if (IsParentAccount) {
            pipeline.push({ $match: { ParentAccountId: { $eq: null } } });
        }
        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "AccountId": "$_id",
                    "AccountName": "$AccountName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "AccountId": 1, "AccountName": { "$ifNull": ["$AccountName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var AccountInfo = await adminMstAccountClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = AccountInfo;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iFK_CategoryId', sql.BigInt, CategoryId);
        //    request.input('bIsParentAccount', sql.Bit, IsParentAccount);

        //    request.execute("[dbo].[USP_SvcAllAccountsListByCategory]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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

const GetAllCountryList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

       
        let pipeline = [];

        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "CountryId": "$_id",
                    "CountryName": "$CountryName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "CountryId": 1, "CountryName": { "$ifNull": ["$CountryName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var CountryInfo = await adminMstCountryClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = CountryInfo;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.execute("[dbo].[USP_SvcGetCountryList]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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
const GetAllStateListCountryId = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var CountryId = req.query.CountryId;
        
        if (!CountryId) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryId) query params must be required!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(CountryId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CountryId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }



        let pipeline = [];
        pipeline.push({ $match: { CountryId: ObjectId(CountryId) } });
        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "StateId": "$_id",
                    "StateName": "$StateName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "StateId": 1, "StateName": { "$ifNull": ["$StateName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var StateInfo = await adminMstStateClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = StateInfo;
        return res.send(ServiceResult);
        //#region SQL DB
        //if (Number(CountryId) <= 0 || (isNaN(Number(CountryId)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(CountryId) query params must be required a number & grater than zero!';
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
        //    request.input('iFK_CountryId', sql.BigInt, CountryId);

        //    request.execute("[dbo].[USP_SvcGetStateDetailsByCountryId]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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
const GetAllCityListByState = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var StateId = req.query.StateId;
        if (!StateId) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(StateId) query params must be required!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(StateId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(StateId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }

        let pipeline = [];
        pipeline.push({ $match: { StateId: ObjectId(StateId) } });
        pipeline.push(
            {
                $match: { IsActive: true, IsDeleted: { $in: [false, null] } }
            },
            {
                "$set": {
                    // Modify a field + add a new field
                    "CityId": "$_id",
                    "CityName": "$CityName"
                }
            },
            {
                "$unset": [
                    // Must now name all the other fields for those fields not to be retained
                    "_id",
                    "__v"
                ]
            },
            { "$project": { "CityId": 1, "CityName": { "$ifNull": ["$CityName", ""] } } },
            { $sort: { CreatedDateTime: -1 } }
        );
        var CityInfo = await adminMstCityClcts.aggregate(pipeline)
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

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = CityInfo;
        return res.send(ServiceResult);
        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iFK_StateId', sql.BigInt, StateId);

        //    request.execute("[dbo].[USP_SvcGetCityDetailsByStateId]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
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
        //                    ServiceResult.Data = recordset.recordsets[1];
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
    GetAllCategoryList,
    GetAllAccountList,
    GetAllParentFormsList,
    GetAllCountryList,
    GetAllStateListCountryId,
    GetAllCityListByState,
    AllAccountsListByCategory,
    GetAllRoleList,

}