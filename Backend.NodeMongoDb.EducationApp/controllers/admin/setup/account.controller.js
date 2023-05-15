'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const date = require('date-and-time');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
const adminMstAccountClcts = require('../../../models/admin/setup/account.model');
const adminLkpCategoryClcts = require('../../../models/admin/setup/category.model');
const adminMstCountryClcts = require('../../../models/admin/setup/country.model');
const adminMstStateClcts = require('../../../models/admin/setup/state.model');
const adminMstCityClcts = require('../../../models/admin/setup/city.model');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminMstRoleClcts = require('../../../models/admin/setup/Role.model');
const adminMapFormRoleClcts = require('../../../models/admin/setup/map.form.role.model');
const adminMapFormAccountClcts = require('../../../models/admin/setup/map.form.account.model');
const adminMapDefaultFormCategoryClcts = require('../../../models/admin/setup/map.defaultForm.category.model');
const CommonFuncs = require('../../../common/common.funcs');
const mongoose = require('mongoose');

var validator = require('validator');
dotenv.config();


const GetAccountDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Account']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        //debugger;

        var AccountId = req.query.AccountId;
        var RowperPage = req.query.RowPerPage;
        var CurrentPage = req.query.CurrentPage;
        var SearchBy = req.query.SearchBy;
        var SearchValue = req.query.SearchValue;

        if ((Number(RowperPage) <= 0 || Number(CurrentPage) <= 0) || (isNaN(Number(RowperPage)) || isNaN(Number(CurrentPage)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RowPerPage & CurrentPage) query params must be required a number & grater than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
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
        var DataList = null;
        RowperPage = Number(RowperPage);
        CurrentPage = Number(CurrentPage);
        const ObjectId = mongoose.Types.ObjectId;

        let pipeline = [];

        pipeline.push(
            {
                $lookup: {
                    from: "admin_lkpcategory_clcts",
                    localField: "CategoryId",
                    foreignField: "_id",
                    as: "CategoryId"
                }
            },
            {
                $lookup: {
                    from: "admin_mstaccount_clcts",
                    localField: "ParentAccountId",
                    foreignField: "_id",
                    as: "ParentAccountId"
                }
            },
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
                $lookup: {
                    from: "admin_mstcity_clcts",
                    localField: "CityId",
                    foreignField: "_id",
                    as: "CityId"
                }
            },
            {
                $lookup: {
                    from: "admin_mstuser_clcts",
                    localField: "DefaultUserId",
                    foreignField: "_id",
                    as: "DefaultUserId"
                }
            },
            {
                $set: {
                    CategoryId: { $arrayElemAt: ["$CategoryId._id", 0] },
                    CategoryName: { $arrayElemAt: ["$CategoryId.CategoryName", 0] },
                    ParentAccountId: { $arrayElemAt: ["$ParentAccountId._id", 0] },
                    ParentAccountName: { $arrayElemAt: ["$ParentAccountId.AccountName", 0] },
                    CountryId: { $arrayElemAt: ["$CountryId._id", 0] },
                    CountryName: { $arrayElemAt: ["$CountryId.CountryName", 0] },
                    StateId: { $arrayElemAt: ["$StateId._id", 0] },
                    StateName: { $arrayElemAt: ["$StateId.StateName", 0] },
                    CityId: { $arrayElemAt: ["$CityId._id", 0] },
                    CityName: { $arrayElemAt: ["$CityId.CityName", 0] },
                    Username: { $arrayElemAt: ["$DefaultUserId.UserName", 0] },
                    Password: { $arrayElemAt: ["$DefaultUserId.Password", 0] },
                    DefaultUserId: { $arrayElemAt: ["$DefaultUserId._id", 0] },
                }
            },
            {
                $addFields: {
                    //"CategoryId": {
                    //    $reduce: {
                    //        input: "$CategoryId._id",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"CategoryName": {
                    //    $reduce: {
                    //        input: "$CategoryId.CategoryName",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"ParentAccountId": {
                    //    $reduce: {
                    //        input: "$ParentAccountId._id",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"ParentAccountName": {
                    //    $reduce: {
                    //        input: "$ParentAccountId.AccountName",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"CountryId": {
                    //    $reduce: {
                    //        input: "$CountryId._id",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"CountryName": {
                    //    $reduce: {
                    //        input: "$CountryId.CountryName",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"StateId": {
                    //    $reduce: {
                    //        input: "$StateId._id",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"StateName": {
                    //    $reduce: {
                    //        input: "$StateId.StateName",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"CityId": {
                    //    $reduce: {
                    //        input: "$CityId._id",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
                    //"CityName": {
                    //    $reduce: {
                    //        input: "$CityId.CityName",
                    //        initialValue: "",
                    //        in: {
                    //            $cond: [
                    //                {
                    //                    "$eq": [
                    //                        "$$value",
                    //                        ""
                    //                    ]
                    //                },
                    //                "$$this",
                    //                {
                    //                    $concat: [
                    //                        "$$value",
                    //                        "\n",
                    //                        "$$this"
                    //                    ]
                    //                }
                    //            ]
                    //        }
                    //    }
                    //},
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
        if (AccountId) {
            pipeline.push({ $match: { _id: ObjectId(AccountId) } });
        }
        else if (SearchBy && SearchValue) {
            if (SearchBy == 'AccountName') {
                pipeline.push({
                    $match: { AccountName: { $regex: SearchValue, $options: 'i' } }
                });
            }
            else if (SearchBy == 'CategoryName') {
                pipeline.push({
                    $match: { CategoryName: { $regex: SearchValue, $options: 'i' } }
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
        DataList = await adminMstAccountClcts.aggregate(pipeline)
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

        var TotalCurrentMonth = await adminMstAccountClcts.find(
            {
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
            }
        ).count();
        var TotalActive = await adminMstAccountClcts.find(
            {
                $and: [
                    { IsActive: true },
                    { IsDeleted: { $in: [false, null] } }
                ]
            }
        ).count();

        var TotalInActive = await adminMstAccountClcts.find(
            {
                $and: [
                    { IsActive: false },
                    { IsDeleted: { $in: [false, null] } }
                ]
            }
        ).count();
        var TotalItem = TotalActive + TotalInActive;
        var CountArray = {
            TotalItem: TotalItem,
            TotalCurrentMonth: TotalCurrentMonth,
            TotalActive: TotalActive,
            TotalInActive: TotalInActive
        };
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "ACCOUNT_MASTER" }, { "_id": 0, FormCode: 0 });
        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "ACCOUNT_MASTER" });

        //DataList = CommonFuncs.funcParseInnerObject(JSON.parse(JSON.stringify(DataList)));
        //res.setHeader('Content-Type', 'application/json');
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

        //#region
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iPK_AccountId', sql.BigInt, AccountId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), SearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), SearchValue);
        //    request.execute("[dbo].[USP_SvcGetAccountDetails]", function (err, recordset) {

        //        if (err) {
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err;
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
        //                    ServiceResult.Description = error;
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

const AddEditAccountDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Account']
        #swagger.description = ''
    */
    var uploadFilePath = null;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    let message = "", bool = true, AccountLogo_Multipart = null, Body_AccountDetails = null;


    try {
        //debugger;


        if (!Object.keys(req.body).includes("AccountDetails")) {
            message = "No were data found for account details with form data key ('AccountDetails')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            Body_AccountDetails = JSON.parse(req.body.AccountDetails);
        }
        if (bool) {
            if (Object.hasOwn(Body_AccountDetails, 'StepCompleted')) {
                if (Body_AccountDetails.StepCompleted == "AdditionalInfo") {
                    if (!Body_AccountDetails.AccountLogoUrl) {
                        if ((!req.files || Object.keys(req.files).length <= 0)) {
                            message = "No files were uploaded for account logo!";
                            bool = false;
                        }
                        else if (Object.keys(req.files) != "AccountLogo") {
                            message = "No files were uploaded for account logo with form data key ('AccountLogo')!";
                            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                            //return;
                            bool = false;
                        }
                        else {
                            AccountLogo_Multipart = req.files.AccountLogo;
                            let fileName = AccountLogo_Multipart.name;
                            let extension = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length - fileName.lastIndexOf('.')).toUpperCase();
                            //Size and format validations
                            if (!["PNG", "JPEG", "JPG"].includes(extension)) {
                                message = "Invalid account logo image format? only (jpg,jpeg,png) images are required!";
                                bool = false;
                            }
                            else if ((AccountLogo_Multipart.size / (1000 * 1000)) > 1) {
                                message = "Invalid account logo image size? Only 1MB image are valid!";
                                bool = false;
                            }
                        }
                    }
                }
                else if (Body_AccountDetails.StepCompleted != "AccountDetails" && Body_AccountDetails.StepCompleted != "Credentials" && Body_AccountDetails.StepCompleted != "AdditionalInfo") {
                    message = "Failed, Invalid completed step was found? form data key ('AccountDetails') with key ('StepCompleted') value must be in ('AccountDetails','AdditionalInfo','Credentials')!";
                    bool = false;
                }
            }
            else {
                message = "No were data found within account details form data key ('AccountDetails') with key ('StepCompleted') value must be in ('AccountDetails','AdditionalInfo','Credentials')!";
                //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                //return;
                bool = false;
            }
        }

        if (!bool) {
            ServiceResult.Message = "Validatio Error!";
            ServiceResult.Description = message;
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        else {
            //Validation Success
            var RootDirectory = require('path').resolve();
            if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
                RootDirectory = `${RootDirectory}/public/images/app_images/account_logo/`
                if (!fs.existsSync(RootDirectory)) {
                    fs.mkdirSync(RootDirectory, { recursive: true });
                }
                let fileName_orignal = AccountLogo_Multipart.name;
                let extension = fileName_orignal.substr(fileName_orignal.lastIndexOf('.'), fileName_orignal.length - fileName_orignal.lastIndexOf('.')).toUpperCase();

                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + extension;
                var uploadedFileUrl = `${process.env.HOST_URL}/images/app_images/account_logo/` + fileName;
                uploadFilePath = RootDirectory + fileName;
                fs.writeFile(uploadFilePath, AccountLogo_Multipart.data, { encoding: 'base64' }, function (err) {
                    ServiceResult.Message = 'Failed while file save!';
                    ServiceResult.Description = err;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                });
            }
            res.setHeader('Content-Type', 'application/json');
            //console.log(Body_AccountDetails);


            if (Body_AccountDetails.StepCompleted == 'AccountDetails') {
                var CreatedByUserInfo = Body_AccountDetails.CreatedBy ? await adminMstUserClcts.findById(Body_AccountDetails.CreatedBy) : "";
                var CategoryIdInfo = Body_AccountDetails.CategoryId ? await adminLkpCategoryClcts.findById(Body_AccountDetails.CategoryId) : "";
                var AccountIdInfo = Body_AccountDetails.ParentAccountId ? await adminMstAccountClcts.findById(Body_AccountDetails.ParentAccountId) : "";

                if (!Body_AccountDetails.AccountId) {
                    const objAdminMstAccountClcts = new adminMstAccountClcts({
                        AccountName: Body_AccountDetails.AccountName,
                        ContactPerson: Body_AccountDetails.ContactPerson,
                        MobileNo: Body_AccountDetails.MobileNo,
                        EmailId: Body_AccountDetails.EmailId,
                        AlternateMobileNo: Body_AccountDetails.AlternateMobileNo,
                        AlternateEmailId: Body_AccountDetails.AlternateEmailId,
                        ParentAccountId: AccountIdInfo ? AccountIdInfo._id : null,
                        CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                        StepCompleted: Body_AccountDetails.StepCompleted,
                        NextStep: Body_AccountDetails.NextStep,
                        CreatedBy: CreatedByUserInfo ? CreatedByUserInfo._id : null,
                        CreatedDateTime: (new Date()),
                        IsActive: true,
                    });
                    await objAdminMstAccountClcts.save()
                        .then(item => {
                            ServiceResult.Message = "A new Account ('" + Body_AccountDetails.AccountName + "') details created successfully, please complete all the steps!";
                            ServiceResult.Result = true;
                            ServiceResult.Description = null;
                            ServiceResult.Data = { CreatedAccountId: item._id };
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
                    await adminMstAccountClcts.findByIdAndUpdate(
                        Body_AccountDetails.AccountId,
                        {
                            AccountName: Body_AccountDetails.AccountName,
                            ContactPerson: Body_AccountDetails.ContactPerson,
                            MobileNo: Body_AccountDetails.MobileNo,
                            EmailId: Body_AccountDetails.EmailId,
                            AlternateMobileNo: Body_AccountDetails.AlternateMobileNo,
                            AlternateEmailId: Body_AccountDetails.AlternateEmailId,
                            ParentAccountId: AccountIdInfo ? AccountIdInfo._id : null,
                            CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                            StepCompleted: Body_AccountDetails.StepCompleted,
                            NextStep: Body_AccountDetails.NextStep,
                            UpdatedBy: CreatedByUserInfo ? CreatedByUserInfo._id : null,
                            UpdatedDateTime: (new Date())
                        },
                        { new: true, useFindAndModify: false }
                    )
                        .then(item => {
                            ServiceResult.Message = "Account details step updated successfully, please complete all the steps!";
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
            }
            else if (Body_AccountDetails.StepCompleted == 'AdditionalInfo') {
                var UpdatedByUserInfo = Body_AccountDetails.UpdatedBy ? await adminMstUserClcts.findById(Body_AccountDetails.UpdatedBy) : "";
                var CountryIdInfo = Body_AccountDetails.CountryId ? await adminMstCountryClcts.findById(Body_AccountDetails.CountryId) : "";
                var StateIdInfo = Body_AccountDetails.StateId ? await adminMstStateClcts.findById(Body_AccountDetails.StateId) : "";
                var CityIdInfo = Body_AccountDetails.CityId ? await adminMstCityClcts.findById(Body_AccountDetails.CityId) : "";
                await adminMstAccountClcts.findByIdAndUpdate(
                    Body_AccountDetails.AccountId,
                    {
                        AccountAddress: Body_AccountDetails.AccountAddress
                        , ZipCode: Body_AccountDetails.ZipCode
                        , CountryId: CountryIdInfo ? CountryIdInfo._id : null
                        , StateId: StateIdInfo ? StateIdInfo._id : null
                        , CityId: CityIdInfo ? CityIdInfo._id : null
                        , ZipCode: Body_AccountDetails.ZipCode
                        , UpdatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null
                        , UpdatedDateTime: (new Date())
                        , NextStep: Body_AccountDetails.NextStep
                        , StepCompleted: Body_AccountDetails.StepCompleted
                        , AccountLogo: uploadedFileUrl
                    },
                    { new: true, useFindAndModify: false }
                )
                    .then(item => {
                        ServiceResult.Message = "Additional info step updated successfully!";
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
            else if (Body_AccountDetails.StepCompleted == 'Credentials') {
                var UpdatedByUserInfo = Body_AccountDetails.UpdatedBy ? await adminMstUserClcts.findById(Body_AccountDetails.UpdatedBy) : "";
                //#region Setup User Credentials : Create new user & role & default form role & default form account mappings
                var NewRoleCreated, NewUserCreated, NewFormRoleMappingCreated, NewFormAccountMappingCreated;
                var AccountInfo = await adminMstAccountClcts.findById(Body_AccountDetails.AccountId);
                if (AccountInfo) {
                    if (AccountInfo.DefaultUserId) {
                        NewUserCreated = await adminMstUserClcts.findById(AccountInfo.DefaultUserId);
                    }
                }
                //When Account Credentials Creating first time
                if (!(AccountInfo ? AccountInfo.DefaultUserId : null)) {
                    var MapDefaultFormCategoryInfo = await adminMapDefaultFormCategoryClcts.findOne(
                        // Find documents matching of these values
                        {
                            $and: [
                                { "CategoryId": AccountInfo ? AccountInfo.CategoryId : null },
                                { 'IsActive': true }
                            ]
                        });

                    //#region Validations
                    var UserInfo = await adminMstUserClcts.findOne(
                        // Find documents matching of these values
                        {
                            $and: [
                                { "UserName": Body_AccountDetails.Username },
                                { "Password": Body_AccountDetails.Password },
                                { "_id": { $nin: AccountInfo ? AccountInfo.DefaultUserId : null } },
                                { 'IsActive': true },
                                { 'IsDeleted': false }
                            ]
                        }
                    );

                    if (UserInfo) {
                        ServiceResult.Message = "Validation Error!";
                        ServiceResult.Result = false;
                        ServiceResult.Description = "This Username ('" + Body_AccountDetails.Username + "') already exists, please try to create different Username!";
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                    //#endregion
                    //#region Created New Role
                    const objAdminMstRoleClcts = new adminMstRoleClcts({
                        RoleName: 'Admin',
                        CategoryId: AccountInfo ? AccountInfo.CategoryId : null,
                        AccountId: AccountInfo ? AccountInfo._id : null,
                        LandingPage: MapDefaultFormCategoryInfo ? MapDefaultFormCategoryInfo.FormId : null,
                        IsActive: Body_AccountDetails.IsActive,
                        CreatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null,
                        CreatedDateTime: (new Date()),
                    });
                    await objAdminMstRoleClcts.save()
                        .then(item => {
                            NewRoleCreated = item;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                    //#endregion
                    //#region Created New User
                    const objAdminMstUserClcts = new adminMstUserClcts({
                        FullName: Body_AccountDetails.FullName,
                        MobileNo: AccountInfo ? AccountInfo.MobileNo : null,
                        EmailId: AccountInfo ? AccountInfo.EmailId : null,
                        UserName: Body_AccountDetails.Username,
                        Password: Body_AccountDetails.Password,
                        RoleId: NewRoleCreated ? NewRoleCreated._id : null,
                        AccountId: AccountInfo ? AccountInfo._id : null,
                        CategoryId: AccountInfo ? AccountInfo.CategoryId : null,
                        CountryId: AccountInfo ? AccountInfo.CountryId : null,
                        StateId: AccountInfo ? AccountInfo.StateId : null,
                        CityId: AccountInfo ? AccountInfo.CityId : null,
                        IsActive: Body_AccountDetails.IsActive,
                        CreatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null,
                        CreatedDateTime: (new Date())
                    });
                    await objAdminMstUserClcts.save()
                        .then(item => {
                            NewUserCreated = item;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                    //#endregion
                    //#region Create Default Form Role Mapping
                    const objAdminMapFormRoleClcts = new adminMapFormRoleClcts({
                        FormId: MapDefaultFormCategoryInfo ? MapDefaultFormCategoryInfo.FormId : null,
                        RoleId: NewRoleCreated ? NewRoleCreated._id : null,
                        CanAdd: true,
                        CanEdit: true,
                        CanDelete: true,
                        CanView: true,
                        IsActive: Body_AccountDetails.IsActive,
                        CreatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null,
                        CreatedDateTime: (new Date()),
                        InsertionMode: "While Account Creation Default Mapping'"
                    });
                    await objAdminMapFormRoleClcts.save()
                        .then(item => {
                            NewFormRoleMappingCreated = item;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                    //#endregion
                    //#region Create Default Form Account Mapping
                    const objAdminMapFormAccountClcts = new adminMapFormAccountClcts({
                        FormId: MapDefaultFormCategoryInfo ? MapDefaultFormCategoryInfo.FormId : null,
                        AccountId: AccountInfo ? AccountInfo._id : null,
                        CanAdd: true,
                        CanEdit: true,
                        CanDelete: true,
                        CanView: true,
                        IsActive: Body_AccountDetails.IsActive,
                        CreatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null,
                        CreatedDateTime: (new Date()),
                        InsertionMode: "While Account Creation Default Mapping'"
                    });
                    await objAdminMapFormAccountClcts.save()
                        .then(item => {
                            NewFormAccountMappingCreated = item;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                    //#endregion
                }
                else {
                    //Update User details in user master
                    await adminMstUserClcts.findByIdAndUpdate(
                        AccountInfo.DefaultUserId,
                        {
                            UserName: Body_AccountDetails.Username
                            , Password: Body_AccountDetails.Password
                            , IsActive: Body_AccountDetails.IsActive
                            , UpdatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null
                            , UpdatedDateTime: (new Date())
                        },
                        { new: true, useFindAndModify: false }
                    )
                        .then(item => {
                            NewUserCreated = item;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                }
                await adminMstAccountClcts.findByIdAndUpdate(
                    Body_AccountDetails.AccountId,
                    {
                        DefaultUserId: NewUserCreated ? NewUserCreated._id : null
                        , IsActive: Body_AccountDetails.IsActive
                        , UpdatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null
                        , UpdatedDateTime: (new Date())
                        , NextStep: Body_AccountDetails.NextStep
                        , StepCompleted: Body_AccountDetails.StepCompleted
                    },
                    { new: true, useFindAndModify: false }
                )
                    .then(item => {
                        ServiceResult.Message = "Credentials step updated successfully!";
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
                ServiceResult.Message = "Validatio Error!";
                ServiceResult.Description = "No were data found within Account details form data key ('AccountDetails') with key ('StepCompleted') value must be in ('AccountDetails','AdditionalInfo','Credentials')!";
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }

            //#region SQL DB
            //var poolPromise = new sql.ConnectionPool(config.sql);
            //await poolPromise.connect().then(function (pool) {
            //    //the pool that is created and should be used
            //    // create Request object
            //    var request = new sql.Request(pool);
            //    //the pool from the promise

            //    if (Body_AccountDetails.StepCompleted == "AccountDetails") {
            //        request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
            //        request.input('cAccountName', sql.NVarChar(100), Body_AccountDetails.AccountName);
            //        request.input('iFK_CategoryId', sql.BIGINT, Body_AccountDetails.CategoryId);
            //        request.input('iParentAccountId', sql.BIGINT, Body_AccountDetails.ParentAccountId);
            //        request.input('cContactPerson', sql.NVarChar(100), Body_AccountDetails.ContactPerson);
            //        request.input('cMobileNo', sql.NVarChar(100), Body_AccountDetails.MobileNo);
            //        request.input('cAlternateMobileNo', sql.NVarChar(100), Body_AccountDetails.AlternateMobileNo);
            //        request.input('cEmailId', sql.NVarChar(100), Body_AccountDetails.EmailId);
            //        request.input('cAlternateEmailId', sql.NVarChar(100), Body_AccountDetails.AlternateEmailId);
            //    }
            //    else if (Body_AccountDetails.StepCompleted == "AdditionalInfo") {
            //        request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
            //        request.input('cAccountAddress', sql.NVarChar(500), Body_AccountDetails.AccountAddress);
            //        request.input('cZipCode', sql.NVarChar(100), Body_AccountDetails.ZipCode);
            //        request.input('iFK_CountryId', sql.NVarChar(100), Body_AccountDetails.CountryId);
            //        request.input('iFK_StateId', sql.NVarChar(100), Body_AccountDetails.StateId);
            //        request.input('iFK_CityId', sql.NVarChar(100), Body_AccountDetails.CityId);
            //        request.input('cAccountLogo', sql.NVarChar(100), uploadedFileUrl);
            //    }
            //    else if (Body_AccountDetails.StepCompleted == "Credentials") {
            //        request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
            //        request.input('bIsActive', sql.BIT, Body_AccountDetails.IsActive === "true" ? true : false);
            //        request.input('Username', sql.NVarChar(100), Body_AccountDetails.Username);
            //        request.input('Password', sql.NVarChar(100), Body_AccountDetails.Password);
            //    }
            //    request.input('StepCompleted', sql.NVarChar(100), Body_AccountDetails.StepCompleted);
            //    request.input('NextStep', sql.NVarChar(100), Body_AccountDetails.NextStep);
            //    request.input('CreatedBy', sql.NVarChar(100), Body_AccountDetails.CreatedBy);

            //    request.execute("[dbo].[USP_SvcAddEditAccount]", function (err, recordset) {
            //        try {
            //            if (err) {
            //                console.log(err);
            //                sql.close();
            //                ServiceResult.Message = "Failed to parse api response!";
            //                ServiceResult.Description = err.message;
            //                ServiceResult.Result = false;
            //                ServiceResult.Data = null;
            //                if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                    if (fs.existsSync(uploadFilePath)) {
            //                        fs.unlinkSync(uploadFilePath)
            //                    }
            //                }
            //                return res.send(ServiceResult);
            //            }
            //            sql.close();
            //            if (recordset) {
            //                if (recordset.recordsets[0][0].Message_Id == 1) {
            //                    try {
            //                        let Data = null;
            //                        if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                            RootDirectory = require('path').resolve();
            //                            let AccountLogoBeforeUpdate = recordset.recordsets[1][0].AccountLogoBeforeUpdate;
            //                            let previousImage = (AccountLogoBeforeUpdate)
            //                                .replace(process.env.HOST_URL, RootDirectory)
            //                                .replace('/images/', '/public/images/');
            //                            console.log(previousImage);
            //                            if (fs.existsSync(previousImage)) {
            //                                fs.unlinkSync(previousImage);
            //                            }
            //                        }
            //                        else if (Body_AccountDetails.StepCompleted == "AccountDetails") {
            //                            Data = recordset.recordsets[1][0];
            //                        }
            //                        //Success Case
            //                        ServiceResult.Message = recordset.recordsets[0][0].Message;
            //                        ServiceResult.Description = null;
            //                        ServiceResult.Result = true;
            //                        ServiceResult.Data = Data;
            //                        //Delete previoud image


            //                        return res.send(ServiceResult);
            //                    } catch (error) {
            //                        ServiceResult.Message = "Failed to parse api response!";
            //                        ServiceResult.Description = error.message;
            //                        ServiceResult.Result = false;
            //                        ServiceResult.Data = null;
            //                        if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                            if (fs.existsSync(uploadFilePath)) {
            //                                fs.unlinkSync(uploadFilePath)
            //                            }
            //                        }
            //                        return res.send(ServiceResult);
            //                    }
            //                }
            //                else {
            //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
            //                    ServiceResult.Result = false;
            //                    ServiceResult.Description = null;
            //                    ServiceResult.Data = null;
            //                    if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                        if (fs.existsSync(uploadFilePath)) {
            //                            fs.unlinkSync(uploadFilePath)
            //                        }
            //                    }
            //                    return res.send(ServiceResult);
            //                }
            //            }
            //            else {
            //                ServiceResult.Message = "Failed to parse api response!";
            //                ServiceResult.Result = false;
            //                ServiceResult.Description = null;
            //                ServiceResult.Data = null;
            //                if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                    if (fs.existsSync(uploadFilePath)) {
            //                        fs.unlinkSync(uploadFilePath)
            //                    }
            //                }
            //                return res.send(ServiceResult);
            //            }
            //        } catch (e) {
            //            ServiceResult.Message = 'API Internal Error!';
            //            ServiceResult.Description = null;
            //            ServiceResult.Result = false;
            //            ServiceResult.Data = null;
            //            ServiceResult.Description = JSON.stringify(e.message);
            //            if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            //                if (fs.existsSync(uploadFilePath)) {
            //                    fs.unlinkSync(uploadFilePath)
            //                }
            //            }
            //            return res.send(ServiceResult);
            //        }
            //    });
            //});
            //#endregion
        }

    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
            if (fs.existsSync(uploadFilePath)) {
                fs.unlinkSync(uploadFilePath)
            }
        }
        return res.send(ServiceResult);
    }
}

const DeleteAccountsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Account']
        #swagger.description = ''
    */
    //debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_AccountId = req.query.AccountId;
        var DeletedBy = req.query.DeletedBy;

        if (!validator.isMongoId(iPK_AccountId) || !validator.isMongoId(DeletedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(AccountId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUserInfo = DeletedBy ? await adminMstUserClcts.findById(DeletedBy) : "";
        await adminMstAccountClcts.findByIdAndUpdate(
            iPK_AccountId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUserInfo ? DeletedByUserInfo._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "Account details deleted successfully!";
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
        //if ((Number(iPK_AccountId) <= 0 || Number(DeletedBy) <= 0) || (isNaN(Number(iPK_AccountId)) || isNaN(Number(DeletedBy)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(AccountId & DeletedBy) query params must be required a number & grater than zero!';
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

        //    request.input('iPK_AccountId', sql.BigInt, iPK_AccountId);
        //    request.input('iDeletedId', sql.BigInt, DeletedBy);

        //    request.execute("[dbo].[USP_SvcDeleteAccount]", function (err, recordset) {
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
        //                    ServiceResult.Description = error;
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
    GetAccountDetails,
    AddEditAccountDetails,
    DeleteAccountsDetails
}