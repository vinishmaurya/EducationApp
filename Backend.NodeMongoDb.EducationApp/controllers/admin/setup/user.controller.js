'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const fs = require('fs-extra');
const date = require('date-and-time');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminMstTokenFamilyClcts = require('../../../models/admin/setup/tokenFamily.model');
const adminMstRoleClcts = require('../../../models/admin/setup/Role.model');
const adminMstAccountClcts = require('../../../models/admin/setup/account.model');
const adminLkpCategoryClcts = require('../../../models/admin/setup/category.model');
const adminMstCountryClcts = require('../../../models/admin/setup/country.model');
const adminMstStateClcts = require('../../../models/admin/setup/state.model');
const adminMstCityClcts = require('../../../models/admin/setup/city.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
const adminMapFormRoleClcts = require('../../../models/admin/setup/map.form.role.model');
const CommonFuncs = require('../../../common/common.funcs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var validator = require('validator');

const GetUserDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.User']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_UserId = req.query.UserId;
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

        if (iPK_UserId) {
            if (!validator.isMongoId(iPK_UserId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(UserId) query params must be a valid mongo id!';
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
                    from: "admin_lkpcategory_clcts",
                    localField: "CategoryId",
                    foreignField: "_id",
                    as: "CategoryId"
                }
            },
            {
                $lookup: {
                    from: "admin_mstaccount_clcts",
                    localField: "AccountId",
                    foreignField: "_id",
                    as: "AccountId"
                }
            },
            {
                $lookup: {
                    from: "admin_mstrole_clcts",
                    localField: "RoleId",
                    foreignField: "_id",
                    as: "RoleId"
                }
            },
            {
                $set: {
                    CategoryId: { $arrayElemAt: ["$CategoryId._id", 0] },
                    CategoryName: { $arrayElemAt: ["$CategoryId.CategoryName", 0] },
                    AccountId: { $arrayElemAt: ["$AccountId._id", 0] },
                    AccountName: { $arrayElemAt: ["$AccountId.AccountName", 0] },
                    RoleName: { $arrayElemAt: ["$RoleId.RoleName", 0] },
                    RoleId: { $arrayElemAt: ["$RoleId._id", 0] },
                    UserPassword: "$Password",
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
        if (iPK_UserId) {
            pipeline.push({ $match: { _id: ObjectId(iPK_UserId) } });
        }
        else if (cSearchBy && cSearchValue) {
            if (cSearchBy == 'UserName') {
                pipeline.push({
                    $match: { UserName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'MobileNo') {
                pipeline.push({
                    $match: { MobileNo: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'EmailId') {
                pipeline.push({
                    $match: { EmailId: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'CategoryName') {
                pipeline.push({
                    $match: { CategoryName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'AccountName') {
                pipeline.push({
                    $match: { AccountName: { $regex: cSearchValue, $options: 'i' } }
                });
            }
            else if (cSearchBy == 'RoleName') {
                pipeline.push({
                    $match: { RoleName: { $regex: cSearchValue, $options: 'i' } }
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
        DataList = await adminMstUserClcts.aggregate(pipeline)
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


        var TotalCurrentMonth = await adminMstUserClcts.find({
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
        var TotalActive = await adminMstUserClcts.find({
            $and: [
                { IsActive: true },
                { IsDeleted: { $in: [false, null] } }
            ]
        }).count();

        var TotalInActive = await adminMstUserClcts.find({
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
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "USER_MASTER" }, { "_id": 0, FormCode: 0 });
        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "USER_MASTER" });
        DataList = CommonFuncs.funcParseInnerObject(JSON.parse(JSON.stringify(DataList)));
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
        //await sql.connect(config.sql, function (err) {
        //    if (err) {
        //        ServiceResult.Message = "Failed to generate api response!";
        //        ServiceResult.Description = err.message;
        //        ServiceResult.Result = false;
        //        ServiceResult.Data = null;
        //        return res.send(ServiceResult);
        //    }
        //    // create Request object
        //    var request = new sql.Request();
        //    request.input('iPK_UserId', sql.BigInt, iPK_UserId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), cSearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), cSearchValue);
        //    request.execute("[dbo].[USP_SvcGetuserDetails]", function (err, recordset) {
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
        //#Endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditUserDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.User']
        #swagger.description = ''
    */
    var uploadFilePath = null;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    let message = "", bool = true, UserLogo_Multipart = null, Body_UserDetails = null;

    try {
        //debugger;



        if (!Object.keys(req.body).includes("UserDetails")) {
            message = "No were data found for User details with form data key ('UserDetails')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            Body_UserDetails = JSON.parse(req.body.UserDetails);
        }
        if (bool) {
            if (Object.hasOwn(Body_UserDetails, 'StepCompleted')) {
                if (Body_UserDetails.StepCompleted == "AdditionalInfo") {
                    if (!Body_UserDetails.UserLogoUrl) {
                        if ((!req.files || Object.keys(req.files).length <= 0)) {
                            message = "No files were uploaded for User logo!";
                            bool = false;
                        }
                        else if (Object.keys(req.files) != "UserLogo") {
                            message = "No files were uploaded for User logo with form data key ('UserLogo')!";
                            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                            //return;
                            bool = false;
                        }
                        else {
                            UserLogo_Multipart = req.files.UserLogo;
                            let fileName = UserLogo_Multipart.name;
                            let extension = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length - fileName.lastIndexOf('.')).toUpperCase();
                            //Size and format validations
                            if (!["PNG", "JPEG", "JPG"].includes(extension)) {
                                message = "Invalid User logo Image format? only (jpg,jpeg,png) images are required!";
                                bool = false;
                            }
                            else if ((UserLogo_Multipart.size / (1000 * 1000)) > 1) {
                                message = "Invalid User logo Image size? Only 1MB image are valid!";
                                bool = false;
                            }
                        }
                    }
                }
                else if (Body_UserDetails.StepCompleted != "UserDetails" && Body_UserDetails.StepCompleted != "Credentials" && Body_UserDetails.StepCompleted != "AdditionalInfo") {
                    message = "Failed, Invalid completed step was found? form data key ('UserDetails') with key ('StepCompleted') value must be in ('UserDetails','AdditionalInfo','Credentials')!";
                    bool = false;
                }
            }
            else {
                message = "No were data found within User details form data key ('UserDetails') with key ('StepCompleted') value must be in ('UserDetails','AdditionalInfo','Credentials')!";
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
            if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                RootDirectory = `${RootDirectory}/public/images/app_images/user_logo/`
                if (!fs.existsSync(RootDirectory)) {
                    fs.mkdirSync(RootDirectory, { recursive: true });
                }
                let fileName_orignal = UserLogo_Multipart.name;
                let extension = fileName_orignal.substr(fileName_orignal.lastIndexOf('.'), fileName_orignal.length - fileName_orignal.lastIndexOf('.')).toUpperCase();

                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + extension;
                var uploadedFileUrl = `${process.env.HOST_URL}/images/app_images/user_logo/` + fileName;
                uploadFilePath = RootDirectory + fileName;
                fs.writeFile(uploadFilePath, UserLogo_Multipart.data, { encoding: 'base64' }, function (err) {
                    ServiceResult.Message = 'Failed while file save!';
                    ServiceResult.Description = err;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                });
            }
            res.setHeader('Content-Type', 'application/json');
            //console.log(Body_UserDetails);

            if (Body_UserDetails.StepCompleted == 'UserDetails') {
                var RoleIdInfo = Body_UserDetails.RoleId ? await adminMstRoleClcts.findById(Body_UserDetails.RoleId) : "";
                var CreatedByUserInfo = Body_UserDetails.CreatedBy ? await adminMstUserClcts.findById(Body_UserDetails.CreatedBy) : "";
                var CategoryIdInfo = Body_UserDetails.CategoryId ? await adminLkpCategoryClcts.findById(Body_UserDetails.CategoryId) : "";
                var AccountIdInfo = Body_UserDetails.AccountId ? await adminMstAccountClcts.findById(Body_UserDetails.AccountId) : "";

                if (!Body_UserDetails.UserId) {
                    const objAdminMstUserClcts = new adminMstUserClcts({
                        FullName: Body_UserDetails.FullName,
                        MobileNo: Body_UserDetails.MobileNo,
                        EmailId: Body_UserDetails.EmailId,
                        RoleId: RoleIdInfo ? RoleIdInfo._id : null,
                        AccountId: AccountIdInfo ? AccountIdInfo._id : null,
                        CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                        StepCompleted: Body_UserDetails.StepCompleted,
                        NextStep: Body_UserDetails.NextStep,
                        CreatedBy: CreatedByUserInfo ? CreatedByUserInfo._id : null,
                        CreatedDateTime: (new Date())
                    });
                    await objAdminMstUserClcts.save()
                        .then(item => {
                            ServiceResult.Message = "A new user ('" + Body_UserDetails.FullName + "') details created successfully, please complete all the steps!";
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
                    await adminMstUserClcts.findByIdAndUpdate(
                        Body_UserDetails.UserId,
                        {
                            FullName: Body_UserDetails.FullName,
                            MobileNo: Body_UserDetails.MobileNo,
                            EmailId: Body_UserDetails.EmailId,
                            RoleId: RoleIdInfo ? RoleIdInfo._id : null,
                            AccountId: AccountIdInfo ? AccountIdInfo._id : null,
                            CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                            StepCompleted: Body_UserDetails.StepCompleted,
                            NextStep: Body_UserDetails.NextStep,
                            UpdatedBy: CreatedByUserInfo ? CreatedByUserInfo._id : null,
                            UpdatedDateTime: (new Date())
                        },
                        { new: true, useFindAndModify: false }
                    )
                        .then(item => {
                            ServiceResult.Message = "User details step updated successfully, please complete all the steps!";
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
            else if (Body_UserDetails.StepCompleted == 'AdditionalInfo') {
                var UpdatedByUserInfo = Body_UserDetails.UpdatedBy ? await adminMstUserClcts.findById(Body_UserDetails.UpdatedBy) : "";
                var CountryIdInfo = Body_UserDetails.CountryId ? await adminMstCountryClcts.findById(Body_UserDetails.CountryId) : "";
                var StateIdInfo = Body_UserDetails.StateId ? await adminMstStateClcts.findById(Body_UserDetails.StateId) : "";
                var CityIdInfo = Body_UserDetails.CityId ? await adminMstCityClcts.findById(Body_UserDetails.CityId) : "";
                await adminMstUserClcts.findByIdAndUpdate(
                    Body_UserDetails.UserId,
                    {
                        Gender: Body_UserDetails.Gender
                        , DateOfBirth: Body_UserDetails.DateOfBirth
                        , AlternateEmailId: Body_UserDetails.AlternateEmailId
                        , AlternateMobileNo: Body_UserDetails.AlternateMobileNo
                        , CountryId: CountryIdInfo ? CountryIdInfo._id : null
                        , StateId: StateIdInfo ? StateIdInfo._id : null
                        , CityId: CityIdInfo ? CityIdInfo._id : null
                        , ZipCode: Body_UserDetails.ZipCode
                        , UserAddress: Body_UserDetails.UserAddress
                        , UpdatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null
                        , UpdatedDateTime: (new Date())
                        , NextStep: Body_UserDetails.NextStep
                        , StepCompleted: Body_UserDetails.StepCompleted
                        , UserLogo: uploadedFileUrl
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
            else if (Body_UserDetails.StepCompleted == 'Credentials') {
                //#region Validations
                var UserInfo = await adminMstUserClcts.findOne(
                    // Find documents matching of these values
                    {
                        $and: [
                            { "UserName": Body_UserDetails.Username },
                            { 'IsActive': true },
                            { IsDeleted: { $in: [false, null] } }
                        ]
                    }
                );

                if (UserInfo) {
                    ServiceResult.Message = "Validation Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = "This Username ('" + Body_UserDetails.Username + "') already exists, please try to create different Username!";
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
                //#endregion
                var UpdatedByUserInfo = Body_UserDetails.UpdatedBy ? await adminMstUserClcts.findById(Body_UserDetails.UpdatedBy) : "";
                await adminMstUserClcts.findByIdAndUpdate(
                    Body_UserDetails.UserId,
                    {
                        UserName: Body_UserDetails.Username
                        , Password: Body_UserDetails.Password
                        , IsActive: Body_UserDetails.IsActive
                        , UpdatedBy: UpdatedByUserInfo ? UpdatedByUserInfo._id : null
                        , UpdatedDateTime: (new Date())
                        , NextStep: Body_UserDetails.NextStep
                        , StepCompleted: Body_UserDetails.StepCompleted
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
                ServiceResult.Description = "No were data found within User details form data key ('UserDetails') with key ('StepCompleted') value must be in ('UserDetails','AdditionalInfo','Credentials')!";
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }

            //#region SQL DB
            //await sql.connect(config.sql, function (err) {
            //    try {
            //        if (err) {
            //            console.log(err);
            //            ServiceResult.Message = "Failed to parse api request!";
            //            ServiceResult.Description = JSON.stringify(err);
            //            ServiceResult.Result = false;
            //            ServiceResult.Data = null;
            //            return res.send(ServiceResult);
            //        }
            //        // create Request object
            //        var request = new sql.Request();

            //        if (Body_UserDetails.StepCompleted == "UserDetails") {
            //            request.input('cFullName', sql.NVarChar(500), Body_UserDetails.FullName);
            //            request.input('cMobileNo', sql.NVarChar(500), Body_UserDetails.MobileNo);
            //            request.input('cEmailId', sql.NVarChar(500), Body_UserDetails.EmailId);
            //            request.input('iFK_RoleId', sql.BigInt, Body_UserDetails.RoleId);
            //            request.input('iFK_AccountId', sql.BigInt, Body_UserDetails.AccountId);
            //            request.input('iFK_CategoryId', sql.BigInt, Body_UserDetails.CategoryId);
            //        }
            //        else if (Body_UserDetails.StepCompleted == "AdditionalInfo") {
            //            request.input('bGender', sql.NVarChar(500), Body_UserDetails.Gender);
            //            request.input('cDateOfBirth', sql.NVarChar(500), Body_UserDetails.DateOfBirth);
            //            request.input('cAlternateEmailId', sql.NVarChar(500), Body_UserDetails.AlternateEmailId);
            //            request.input('iAlternateMobileNo', sql.NVarChar(500), Body_UserDetails.AlternateMobileNo);
            //            request.input('iFK_CountryId', sql.NVarChar(100), Body_UserDetails.CountryId);
            //            request.input('iFK_StateId', sql.NVarChar(100), Body_UserDetails.StateId);
            //            request.input('iFK_CityId', sql.NVarChar(100), Body_UserDetails.CityId);
            //            request.input('cZipCode', sql.NVarChar(100), Body_UserDetails.ZipCode);
            //            request.input('cUserAddress', sql.NVarChar(500), Body_UserDetails.UserAddress);
            //            request.input('cUserLogo', sql.NVarChar(100), uploadedFileUrl);
            //        }
            //        else if (Body_UserDetails.StepCompleted == "Credentials") {
            //            request.input('bIsActive', sql.BIT, Body_UserDetails.IsActive === "true" ? true : false);
            //            request.input('cUserName', sql.NVarChar(100), Body_UserDetails.Username);
            //            request.input('cUserPassword', sql.NVarChar(100), Body_UserDetails.Password);
            //        }
            //        request.input('iPK_UserId', sql.BigInt, Body_UserDetails.UserId);
            //        request.input('StepCompleted', sql.NVarChar(100), Body_UserDetails.StepCompleted);
            //        request.input('NextStep', sql.NVarChar(100), Body_UserDetails.NextStep);
            //        request.input('CreatedBy', sql.NVarChar(100), Body_UserDetails.CreatedBy);

            //        request.execute("[dbo].[USP_SvcAddEditUser]", function (err, recordset) {
            //            try {
            //                if (err) {
            //                    console.log(err);
            //                    sql.close();
            //                    ServiceResult.Message = "Failed to parse api response!";
            //                    ServiceResult.Description = err.message;
            //                    ServiceResult.Result = false;
            //                    ServiceResult.Data = null;
            //                    if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                        if (fs.existsSync(uploadFilePath)) {
            //                            fs.unlinkSync(uploadFilePath)
            //                        }
            //                    }
            //                    return res.send(ServiceResult);
            //                }
            //                sql.close();
            //                if (recordset) {
            //                    if (recordset.recordsets[0][0].Message_Id == 1) {
            //                        try {
            //                            let Data = null;
            //                            if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                                RootDirectory = require('path').resolve();
            //                                let UserLogoBeforeUpdate = recordset.recordsets[1][0].UserLogoBeforeUpdate;
            //                                let previousImage = (UserLogoBeforeUpdate)
            //                                    .replace(process.env.HOST_URL, RootDirectory)
            //                                    .replace('/images/', '/public/images/');
            //                                console.log(previousImage);
            //                                if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                                    if (fs.existsSync(previousImage)) {
            //                                        fs.unlinkSync(previousImage);
            //                                    }
            //                                }
            //                            }
            //                            else if (Body_UserDetails.StepCompleted == "UserDetails") {
            //                                Data = recordset.recordsets[1][0];
            //                            }
            //                            //Success Case
            //                            ServiceResult.Message = recordset.recordsets[0][0].Message;
            //                            ServiceResult.Description = null;
            //                            ServiceResult.Result = true;
            //                            ServiceResult.Data = Data;
            //                            //Delete previoud image


            //                            return res.send(ServiceResult);
            //                        } catch (error) {
            //                            ServiceResult.Message = "Failed to parse api response!";
            //                            ServiceResult.Description = error.message;
            //                            ServiceResult.Result = false;
            //                            ServiceResult.Data = null;
            //                            if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                                if (fs.existsSync(uploadFilePath)) {
            //                                    fs.unlinkSync(uploadFilePath)
            //                                }
            //                            }
            //                            return res.send(ServiceResult);
            //                        }
            //                    }
            //                    else {
            //                        ServiceResult.Message = recordset.recordsets[0][0].Message;
            //                        ServiceResult.Result = false;
            //                        ServiceResult.Description = null;
            //                        ServiceResult.Data = null;
            //                        if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                            if (fs.existsSync(uploadFilePath)) {
            //                                fs.unlinkSync(uploadFilePath)
            //                            }
            //                        }
            //                        return res.send(ServiceResult);
            //                    }
            //                }
            //                else {
            //                    ServiceResult.Message = "Failed to parse api response!";
            //                    ServiceResult.Result = false;
            //                    ServiceResult.Description = null;
            //                    ServiceResult.Data = null;
            //                    if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                        if (fs.existsSync(uploadFilePath)) {
            //                            fs.unlinkSync(uploadFilePath)
            //                        }
            //                    }
            //                    return res.send(ServiceResult);
            //                }
            //            } catch (e) {
            //                ServiceResult.Message = 'API Internal Error!';
            //                ServiceResult.Description = null;
            //                ServiceResult.Result = false;
            //                ServiceResult.Data = null;
            //                ServiceResult.Description = JSON.stringify(e.message);
            //                if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //                    if (fs.existsSync(uploadFilePath)) {
            //                        fs.unlinkSync(uploadFilePath)
            //                    }
            //                }
            //                return res.send(ServiceResult);
            //            }
            //        });
            //    } catch (e) {
            //        ServiceResult.Message = "API Internal Error!";
            //        ServiceResult.Result = false;
            //        ServiceResult.Description = e.message;
            //        ServiceResult.Data = null;
            //        if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            //            if (fs.existsSync(uploadFilePath)) {
            //                fs.unlinkSync(uploadFilePath)
            //            }
            //        }
            //        return res.send(ServiceResult);
            //    }
            //});
            //#endregion
        }

    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
            if (fs.existsSync(uploadFilePath)) {
                fs.unlinkSync(uploadFilePath)
            }
        }
        return res.send(ServiceResult);
    }
}

const DeleteUsersDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.User']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_userId = req.query.UserId;
        var iUserId = req.query.DeletedBy;


        if (!validator.isMongoId(iPK_userId) || !validator.isMongoId(iUserId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(UserId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUser = iUserId ? await adminMstUserClcts.findById(iUserId) : "";
        await adminMstUserClcts.findByIdAndUpdate(
            iPK_userId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUser ? DeletedByUser._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "User details deleted successfully!";
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
        //#region #SQL DB
        //if ((Number(iPK_userId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_userId)) || isNaN(Number(iUserId)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(UserId & DeletedBy) query params must be required a number & grater than zero!';
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

        //    request.input('iPK_userId', sql.BigInt, iPK_userId);
        //    request.input('iUserId', sql.BigInt, iUserId);

        //    request.execute("[dbo].[USP_SvcDeleteUser]", function (err, recordset) {
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



const AuthenticatedUserInfo = async (req, res, next) => {
    ///*  #swagger.tags = ['Authentication']
    //    #swagger.description = ''
    //*/
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader.split(' ')[1];

        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        var UserTokenFamily = await adminMstTokenFamilyClcts.findOne(
            // Find documents matching of these values
            {
                $and: [
                    { "AccessToken": accessToken },
                    { 'IsActive': true },
                    { IsDeleted: { $in: [false, null] } }
                ]
            }
        );

        if (!UserTokenFamily) {
            ServiceResult.Message = "Authenticaion Failed!";
            ServiceResult.Description = "Unauthorized? Invalid credentials!";
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var pipeline = [];

        pipeline.push({ $match: { _id: ObjectId(UserTokenFamily.UserId) } });
        pipeline.push(
            {
                "$set": {
                    // Modify a field + add a new field
                    "UserId": "$_id",
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
        var LoggedInUserInfo = await adminMstUserClcts.aggregate(pipeline);
        LoggedInUserInfo = LoggedInUserInfo ? LoggedInUserInfo[0] : null;

        pipeline = [];
        pipeline.push({
            $match: {
                $and: [
                    { "RoleId": LoggedInUserInfo.RoleId },
                    { 'IsActive': true },
                    { 'CanView': true }
                ]
            }
        });
        pipeline.push(
            {
                $lookup: {
                    from: "admin_mstform_clcts",
                    localField: "FormId",
                    foreignField: "_id",
                    as: "FormId",
                }
            },
            {
                $lookup: {
                    from: "admin_mstrole_clcts",
                    localField: "RoleId",
                    foreignField: "_id",
                    as: "RoleId"
                }
            },
            {
                $set: {
                    FormId: { $arrayElemAt: ["$FormId._id", 0] },
                    FormName: { $arrayElemAt: ["$FormId.FormName", 0] },
                    ParentId: { $arrayElemAt: ["$FormId.ParentId", 0] },
                    SolutionId: { $arrayElemAt: ["$FormId.SolutionId", 0] },
                    Area: { $arrayElemAt: ["$FormId.Area", 0] },
                    SPA_ComponentHref: { $arrayElemAt: ["$FormId.SPA_ComponentHref", 0] },
                    ClassName: { $arrayElemAt: ["$FormId.ClassName", 0] },
                    RoleId: { $arrayElemAt: ["$RoleId._id", 0] },
                    HomePage: { $arrayElemAt: ["$RoleId.HomePage", 0] },
                }
            }
        );

        var formRoleMappingInfo = await adminMapFormRoleClcts.aggregate(pipeline);

        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = {
            userInfo: LoggedInUserInfo,
            formRoleMappingInfo: formRoleMappingInfo,
        }
        return res.send(ServiceResult);


        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('cAccessToken', sql.NVarChar(300), accessToken);

        //    request.execute("[dbo].[USP_SvcAuthenticatedAPIUserInfo]", function (err, recordset) {
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
        //                    let formRoleMappingInfo = [];
        //                    recordset.recordsets[2].map((column, i) => {
        //                        formRoleMappingInfo.push(column);
        //                    });
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = {
        //                        userInfo: recordset.recordsets[1][0],
        //                        formRoleMappingInfo: formRoleMappingInfo,
        //                    }
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    return res.status(400).send(error.message);
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

const AuthenticatedUserTokenValidation = async (req, res, next) => {
    ///*  #swagger.tags = ['Authentication']
    //    #swagger.description = ''
    //*/
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader.split(' ')[1];

        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        var UserTokenFamily = await adminMstTokenFamilyClcts.findOne(
            // Find documents matching of these values
            {
                $and: [
                    { "AccessToken": accessToken },
                    {
                        'ExpiryDatetime': {
                            "$gt": (new Date()),
                        }
                    },
                    { 'IPAddress': req.ip },
                    { 'IsActive': true },
                    { 'IsDeleted': false }
                ]
            },
            //Excludes Fields
            {
                '_id': 0,
                'UserId': 0,
                'IPAddress': 0,
                'RefreshToken': 0,
                'RefreshTokenExpiryDatetime': 0,
                'UserName': 0,
                'CreatedDatetime': 0,
                '__v': 0,
                'IsActive': 0,
                'IsDeleted': 0
            }
        );

        if (!UserTokenFamily) {
            ServiceResult.Message = "Authenticaion Failed!";
            ServiceResult.Description = "Unauthorized? Invalid credentials!";
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }


        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = UserTokenFamily
        return res.send(ServiceResult);

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise


        //    request.input('cAccessToken', sql.NVarChar(300), accessToken);

        //    request.execute("[dbo].[USP_SvcAuthenticatedAPIUserTokenValidation]", function (err, recordset) {
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
        //                    ServiceResult.Data = recordset.recordsets[1];
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    return res.status(400).send(error.message);
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
    GetUserDetails,
    AddEditUserDetails,
    DeleteUsersDetails,
    AuthenticatedUserInfo,
    AuthenticatedUserTokenValidation,
}