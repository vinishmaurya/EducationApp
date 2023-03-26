'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const fs = require('fs-extra');
const date = require('date-and-time');

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
        await sql.connect(config.sql, function (err) {
            if (err) {
                ServiceResult.Message = "Failed to generate api response!";
                ServiceResult.Description = err.message;
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            // create Request object
            var request = new sql.Request();
            request.input('iPK_UserId', sql.BigInt, iPK_UserId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[dbo].[USP_SvcGetuserDetails]", function (err, recordset) {
                if (err) {
                    sql.close();
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Description = err.message;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
                sql.close();

                if (recordset) {
                    if (recordset.recordsets[0][0].Message_Id == 1) {
                        try {
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Description = null;
                            ServiceResult.Result = true;
                            ServiceResult.Data = {
                                DataList: recordset.recordsets[1],
                                CountArray: recordset.recordsets[2][0],
                                HeaderList: recordset.recordsets[3][0],
                                SearchTermList: recordset.recordsets[4],
                            };
                            return res.send(ServiceResult);
                        } catch (error) {
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = error.message;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        }
                    }
                    else {
                        ServiceResult.Message = recordset.recordsets[0][0].Message;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                }
                else {
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
            });
        });
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
        


        if (Object.keys(req.body) != "UserDetails") {
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
                            //Size and format validations
                            if (
                                String(UserLogo_Multipart.name.split('.')[1]).toUpperCase() != "JPG" &&
                                String(UserLogo_Multipart.name.split('.')[1]).toUpperCase() != "JPEG" &&
                                String(UserLogo_Multipart.name.split('.')[1]).toUpperCase() != "PNG"
                            ) {
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
                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + "." + UserLogo_Multipart.name.split('.')[1];
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
            console.log(Body_UserDetails);

            await sql.connect(config.sql, function (err) {
                try {
                    if (err) {
                        console.log(err);
                        ServiceResult.Message = "Failed to parse api request!";
                        ServiceResult.Description = JSON.stringify(err);
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                    // create Request object
                    var request = new sql.Request();

                    if (Body_UserDetails.StepCompleted == "UserDetails") {
                        request.input('cFullName', sql.NVarChar(500), Body_UserDetails.FullName);
                        request.input('cMobileNo', sql.NVarChar(500), Body_UserDetails.MobileNo);
                        request.input('cEmailId', sql.NVarChar(500), Body_UserDetails.EmailId);
                        request.input('iFK_RoleId', sql.BigInt, Body_UserDetails.RoleId);
                        request.input('iFK_AccountId', sql.BigInt, Body_UserDetails.AccountId);
                        request.input('iFK_CategoryId', sql.BigInt, Body_UserDetails.CategoryId);
                    }
                    else if (Body_UserDetails.StepCompleted == "AdditionalInfo") {
                        request.input('bGender', sql.NVarChar(500), Body_UserDetails.Gender);
                        request.input('cDateOfBirth', sql.NVarChar(500), Body_UserDetails.DateOfBirth);
                        request.input('cAlternateEmailId', sql.NVarChar(500), Body_UserDetails.AlternateEmailId);
                        request.input('iAlternateMobileNo', sql.NVarChar(500), Body_UserDetails.AlternateMobileNo);
                        request.input('iFK_CountryId', sql.NVarChar(100), Body_UserDetails.CountryId);
                        request.input('iFK_StateId', sql.NVarChar(100), Body_UserDetails.StateId);
                        request.input('iFK_CityId', sql.NVarChar(100), Body_UserDetails.CityId);
                        request.input('cZipCode', sql.NVarChar(100), Body_UserDetails.ZipCode);
                        request.input('cUserAddress', sql.NVarChar(500), Body_UserDetails.UserAddress);
                        request.input('cUserLogo', sql.NVarChar(100), uploadedFileUrl);
                    }
                    else if (Body_UserDetails.StepCompleted == "Credentials") {
                        request.input('bIsActive', sql.BIT, Body_UserDetails.IsActive === "true" ? true : false);
                        request.input('cUserName', sql.NVarChar(100), Body_UserDetails.Username);
                        request.input('cUserPassword', sql.NVarChar(100), Body_UserDetails.Password);
                    }
                    request.input('iPK_UserId', sql.BigInt, Body_UserDetails.UserId);
                    request.input('StepCompleted', sql.NVarChar(100), Body_UserDetails.StepCompleted);
                    request.input('NextStep', sql.NVarChar(100), Body_UserDetails.NextStep);
                    request.input('CreatedBy', sql.NVarChar(100), Body_UserDetails.CreatedBy);

                    request.execute("[dbo].[USP_SvcAddEditUser]", function (err, recordset) {
                        try {
                            if (err) {
                                console.log(err);
                                sql.close();
                                ServiceResult.Message = "Failed to parse api response!";
                                ServiceResult.Description = err.message;
                                ServiceResult.Result = false;
                                ServiceResult.Data = null;
                                if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                    if (fs.existsSync(uploadFilePath)) {
                                        fs.unlinkSync(uploadFilePath)
                                    }
                                }
                                return res.send(ServiceResult);
                            }
                            sql.close();
                            if (recordset) {
                                if (recordset.recordsets[0][0].Message_Id == 1) {
                                    try {
                                        let Data = null;
                                        if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                            RootDirectory = require('path').resolve();
                                            let UserLogoBeforeUpdate = recordset.recordsets[1][0].UserLogoBeforeUpdate;
                                            let previousImage = (UserLogoBeforeUpdate)
                                                .replace(process.env.HOST_URL, RootDirectory)
                                                .replace('/images/', '/public/images/');
                                            console.log(previousImage);
                                            if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                                if (fs.existsSync(previousImage)) {
                                                    fs.unlinkSync(previousImage);
                                                }
                                            }
                                        }
                                        else if (Body_UserDetails.StepCompleted == "UserDetails") {
                                            Data = recordset.recordsets[1][0];
                                        }
                                        //Success Case
                                        ServiceResult.Message = recordset.recordsets[0][0].Message;
                                        ServiceResult.Description = null;
                                        ServiceResult.Result = true;
                                        ServiceResult.Data = Data;
                                        //Delete previoud image


                                        return res.send(ServiceResult);
                                    } catch (error) {
                                        ServiceResult.Message = "Failed to parse api response!";
                                        ServiceResult.Description = error.message;
                                        ServiceResult.Result = false;
                                        ServiceResult.Data = null;
                                        if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                            if (fs.existsSync(uploadFilePath)) {
                                                fs.unlinkSync(uploadFilePath)
                                            }
                                        }
                                        return res.send(ServiceResult);
                                    }
                                }
                                else {
                                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                                    ServiceResult.Result = false;
                                    ServiceResult.Description = null;
                                    ServiceResult.Data = null;
                                    if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                        if (fs.existsSync(uploadFilePath)) {
                                            fs.unlinkSync(uploadFilePath)
                                        }
                                    }
                                    return res.send(ServiceResult);
                                }
                            }
                            else {
                                ServiceResult.Message = "Failed to parse api response!";
                                ServiceResult.Result = false;
                                ServiceResult.Description = null;
                                ServiceResult.Data = null;
                                if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                    if (fs.existsSync(uploadFilePath)) {
                                        fs.unlinkSync(uploadFilePath)
                                    }
                                }
                                return res.send(ServiceResult);
                            }
                        } catch (e) {
                            ServiceResult.Message = 'API Internal Error!';
                            ServiceResult.Description = null;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            ServiceResult.Description = JSON.stringify(e.message);
                            if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                                if (fs.existsSync(uploadFilePath)) {
                                    fs.unlinkSync(uploadFilePath)
                                }
                            }
                            return res.send(ServiceResult);
                        }
                    });
                } catch (e) {
                    ServiceResult.Message = "API Internal Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = e.message;
                    ServiceResult.Data = null;
                    if (Body_UserDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                        if (fs.existsSync(uploadFilePath)) {
                            fs.unlinkSync(uploadFilePath)
                        }
                    }
                    return res.send(ServiceResult);
                }
            });
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
        if ((Number(iPK_userId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_userId)) || isNaN(Number(iUserId)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(UserId & DeletedBy) query params must be required a number & grater than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise

            request.input('iPK_userId', sql.BigInt, iPK_userId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[USP_SvcDeleteUser]", function (err, recordset) {
                if (err) {
                    sql.close();
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Description = err.message;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
                sql.close();
                if (recordset) {
                    if (recordset.recordsets[0][0].Message_Id == 1) {
                        try {
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Description = null;
                            ServiceResult.Result = true;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        } catch (error) {
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = error.message;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        }
                    }
                    else {
                        ServiceResult.Message = recordset.recordsets[0][0].Message;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                }
                else {
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
            });
        });
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

        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise

            request.input('cAccessToken', sql.NVarChar(300), accessToken);

            request.execute("[dbo].[USP_SvcAuthenticatedAPIUserInfo]", function (err, recordset) {
                if (err) {
                    sql.close();
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Description = err.message;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
                sql.close();
                if (recordset) {
                    if (recordset.recordsets[0][0].Message_Id == 1) {

                        try {
                            let formRoleMappingInfo = [];
                            recordset.recordsets[2].map((column, i) => {
                                formRoleMappingInfo.push(column);
                            });
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Description = recordset.recordsets[0][0].Message;
                            ServiceResult.Result = true;
                            ServiceResult.Data = {
                                userInfo: recordset.recordsets[1][0],
                                formRoleMappingInfo: formRoleMappingInfo,
                            }
                            return res.send(ServiceResult);
                        } catch (error) {
                            return res.status(400).send(error.message);
                        }
                    }
                    else {
                        ServiceResult.Message = recordset.recordsets[0][0].Message;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                }
                else {
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        return res.status(400).send(error.message);
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
        //if (sql.pool) {
        //console.log(sql.pool);
        //}

        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise


            request.input('cAccessToken', sql.NVarChar(300), accessToken);

            request.execute("[dbo].[USP_SvcAuthenticatedAPIUserTokenValidation]", function (err, recordset) {
                if (err) {
                    sql.close();
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Description = err.message;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
                sql.close();
                if (recordset) {
                    if (recordset.recordsets[0][0].Message_Id == 1) {
                        try {
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Description = null;
                            ServiceResult.Result = true;
                            ServiceResult.Data = recordset.recordsets[1];
                            return res.send(ServiceResult);
                        } catch (error) {
                            return res.status(400).send(error.message);
                        }
                    }
                    else {
                        ServiceResult.Message = recordset.recordsets[0][0].Message;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        return res.send(ServiceResult);
                    }
                }
                else {
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        ServiceResult.Message = "Failed to connect db!";
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