'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const adminMapFormAccountClcts = require('../../../models/admin/setup/map.form.account.model');
const adminMstFormClcts = require('../../../models/admin/setup/form.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var validator = require('validator');

const GetAllFormAccountMappings = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Account']
        #swagger.description = ''
    */
    try {
        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        let AccountId = req.query.AccountId;
        let FormId = req.query.FormId;


        if (!validator.isMongoId(AccountId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(AccountId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (FormId) {
            if (!validator.isMongoId(FormId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(FormId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        res.setHeader('Content-Type', 'application/json');

        var DataList = [];
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "MAP_FORMACCOUNT" }, { "_id": 0, FormCode: 0 });

        var MstFormClctsDataList = await adminMstFormClcts
            //.find()
            .aggregate([
                {
                    $set: {
                        FormId: "$_id",
                        ParentId: "$ParentId",
                    }
                },
                {
                    $match: {
                        $and: [
                            { ParentId: (FormId ? ObjectId(FormId) : null) },
                            { IsActive: true },
                            //{ MappingFor: { $in: ['WEBAPP', null] } },
                        ]
                    }
                },
                {
                    "$unset": [
                        // Must now name all the other fields for those fields not to be retained
                        "_id"
                        , "__v"
                        , "ComponentName"
                        , "LandingComponentName"
                        , "ClassName"
                        , "Area"
                        , "PlatFormType"
                        , "SPA_ComponentHref"
                        , "IsActive"
                        , "CreatedBy"
                        , "CreatedDateTime"
                    ]
                },
                { $sort: { CreatedDateTime: -1 } }
            ]);

        var MapFormAccountDataList = await adminMapFormAccountClcts
            //.find()
            .aggregate([
                {
                    $lookup: {
                        from: "admin_mstform_clcts",
                        localField: "FormId",
                        foreignField: "_id",
                        as: "FormId"
                    }
                },
                {
                    $set: {
                        FormId: { $arrayElemAt: ["$FormId._id", 0] },
                        FormName: { $arrayElemAt: ["$FormId.FormName", 0] },
                        ParentId: { $arrayElemAt: ["$FormId.ParentId", 0] }
                    }
                },
                {
                    $addFields: {
                        AccountId: AccountId
                    }
                },
                {
                    $match: {
                        $and: [
                            { ParentId: (FormId ? ObjectId(FormId) : null) },
                            { IsActive: true },
                            //{ MappingFor: { $in: ['WEBAPP', null] } },
                            //{ AccountId: ObjectId(AccountId) },
                        ]
                    }
                },
                {
                    "$set": {
                        // Modify a field + add a new field
                        "FormAccountId": "$_id",
                    }
                },
                {
                    "$unset": [
                        // Must now name all the other fields for those fields not to be retained
                        "_id"
                        , "__v"
                        , "AccountId"
                        //, "CanAdd"
                        //, "CanEdit"
                        //, "CanDelete"
                        //, "CanView"
                        //, "CanExport"
                        //, "MappingFor"
                        , "IsActive"
                        , "CreatedBy"
                    ]
                },
                { $sort: { CreatedDateTime: -1 } }
            ]);


        MstFormClctsDataList.forEach(function (obj) {
            let bool = false;
            MapFormAccountDataList.forEach(function (obj1) {
                if (JSON.stringify(obj.FormId) == JSON.stringify(obj1.FormId)) {
                    DataList.push(obj1);
                    bool = true;
                }
            });
            if (bool) {
                bool = false;
            }
            else {
                obj["FormAccountId"] = null;
                obj["CanAdd"] = false;
                obj["CanEdit"] = false;
                obj["CanDelete"] = false;
                obj["CanView"] = false;
                obj["CanExport"] = false;
                DataList.push(obj);
            }

        });


        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = {
            HeaderList: [HeaderList],
            DataList: DataList,
        };
        return res.send(ServiceResult);
        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_AccountId', sql.BigInt, AccountId);
        //    request.input('iPK_FormId', sql.BigInt, FormId);

        //    request.execute("[dbo].[USP_SvcGetAllFormAccountMappings]", function (err, recordset) {
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
        //                    ServiceResult.Data = {
        //                        HeaderList: recordset.recordsets[1] ? recordset.recordsets[1] : [],
        //                        DataList: recordset.recordsets[2] ? recordset.recordsets[2] : [],
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
        ServiceResult.Message = "Failed to connect db!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditFormAccountMappings = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Account']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var JsonData = req.body;
        var ValidForInsert = JsonData.filter(item => !item.FormAccountId);

        var ValidForUpdate = JsonData.filter(item => item.FormAccountId);

        for (var i = 0; i < ValidForInsert.length; i++) {
            ValidForInsert[i]['IsActive'] = true;
        }
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const resultInserted = await adminMapFormAccountClcts.insertMany(ValidForInsert, options);
        //var message = `${result.insertedCount} mappings were inserted!`;

        let bulkArr = [];
        for (const i of ValidForUpdate) {
            bulkArr.push({
                updateOne: {
                    "filter": { "_id": mongoose.Types.ObjectId(i.FormAccountId) },
                    "update": {
                        AccountId: i.AccountId,
                        FormId: i.FormId,
                        FormName: i.FormName,
                        MappingFor: i.MappingFor,
                        //ParentId: i.ParentId,
                        LevelId: i.LevelId,
                        SortId: i.SortId,
                        CanAdd: i.CanAdd,
                        CanDelete: i.CanDelete,
                        CanView: i.CanView,
                        CanEdit: i.CanEdit,
                        CanExport: i.CanExport,
                        IsActive: i.IsActive,
                        CreatedBy: i.CreatedBy,
                        All: i.All,
                        IsActive: true
                    }
                }
            })
        }
        await adminMapFormAccountClcts.bulkWrite(bulkArr);

        ServiceResult.Message = "Success!";
        ServiceResult.Result = true;
        ServiceResult.Description = "Mappings updated successfuly!";
        ServiceResult.Data = null;
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('cJsonData', sql.NVarChar(sql.MAX), JSON.stringify(JsonData));

        //    request.execute("[dbo].[USP_SvcAddEditFormAccountMappings]", function (err, recordset) {
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


module.exports = {
    GetAllFormAccountMappings,
    AddEditFormAccountMappings,
}