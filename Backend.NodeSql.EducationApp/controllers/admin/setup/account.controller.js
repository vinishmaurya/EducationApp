'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const dotenv = require('dotenv');
const fs = require('fs-extra');
const date = require('date-and-time');
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
        res.setHeader('Content-Type', 'application/json');
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
        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise
            request.input('iPK_AccountId', sql.BigInt, AccountId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), SearchBy);
            request.input('cSearchValue', sql.VarChar(500), SearchValue);
            request.execute("[dbo].[USP_GetAccountDetails]", function (err, recordset) {

                if (err) {
                    sql.close();
                    ServiceResult.Message = "Failed to parse api response!";
                    ServiceResult.Description = err;
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
                            ServiceResult.Description = error;
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


        if (Object.keys(req.body) != "AccountDetails") {
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
                            //Size and format validations
                            if (
                                String(AccountLogo_Multipart.name.split('.')[1]).toUpperCase() != "JPG" &&
                                String(AccountLogo_Multipart.name.split('.')[1]).toUpperCase() != "JPEG" &&
                                String(AccountLogo_Multipart.name.split('.')[1]).toUpperCase() != "PNG"
                            ) {
                                message = "Invalid account logo Image format? only (jpg,jpeg,png) images are required!";
                                bool = false;
                            }
                            else if ((AccountLogo_Multipart.size / (1000 * 1000)) > 1) {
                                message = "Invalid account logo Image size? Only 1MB image are valid!";
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
                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + "." + AccountLogo_Multipart.name.split('.')[1];
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
            console.log(Body_AccountDetails);

            var poolPromise = new sql.ConnectionPool(config.sql);
            await poolPromise.connect().then(function (pool) {
                //the pool that is created and should be used
                // create Request object
                var request = new sql.Request(pool);
                //the pool from the promise

                if (Body_AccountDetails.StepCompleted == "AccountDetails") {
                    request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
                    request.input('cAccountName', sql.NVarChar(100), Body_AccountDetails.AccountName);
                    request.input('iFK_CategoryId', sql.BIGINT, Body_AccountDetails.CategoryId);
                    request.input('iParentAccountId', sql.BIGINT, Body_AccountDetails.ParentAccountId);
                    request.input('cContactPerson', sql.NVarChar(100), Body_AccountDetails.ContactPerson);
                    request.input('cMobileNo', sql.NVarChar(100), Body_AccountDetails.MobileNo);
                    request.input('cAlternateMobileNo', sql.NVarChar(100), Body_AccountDetails.AlternateMobileNo);
                    request.input('cEmailId', sql.NVarChar(100), Body_AccountDetails.EmailId);
                    request.input('cAlternateEmailId', sql.NVarChar(100), Body_AccountDetails.AlternateEmailId);
                }
                else if (Body_AccountDetails.StepCompleted == "AdditionalInfo") {
                    request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
                    request.input('cAccountAddress', sql.NVarChar(500), Body_AccountDetails.AccountAddress);
                    request.input('cZipCode', sql.NVarChar(100), Body_AccountDetails.ZipCode);
                    request.input('iFK_CountryId', sql.NVarChar(100), Body_AccountDetails.CountryId);
                    request.input('iFK_StateId', sql.NVarChar(100), Body_AccountDetails.StateId);
                    request.input('iFK_CityId', sql.NVarChar(100), Body_AccountDetails.CityId);
                    request.input('cAccountLogo', sql.NVarChar(100), uploadedFileUrl);
                }
                else if (Body_AccountDetails.StepCompleted == "Credentials") {
                    request.input('iPK_AccountId', sql.BigInt, Body_AccountDetails.AccountId);
                    request.input('bIsActive', sql.BIT, Body_AccountDetails.IsActive === "true" ? true : false);
                    request.input('Username', sql.NVarChar(100), Body_AccountDetails.Username);
                    request.input('Password', sql.NVarChar(100), Body_AccountDetails.Password);
                }
                request.input('StepCompleted', sql.NVarChar(100), Body_AccountDetails.StepCompleted);
                request.input('NextStep', sql.NVarChar(100), Body_AccountDetails.NextStep);
                request.input('CreatedBy', sql.NVarChar(100), Body_AccountDetails.CreatedBy);

                request.execute("[dbo].[USP_AddEditAccount]", function (err, recordset) {
                    try {
                        if (err) {
                            console.log(err);
                            sql.close();
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = err.message;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
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
                                    if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && AccountLogo_Multipart) {
                                        RootDirectory = require('path').resolve();
                                        let AccountLogoBeforeUpdate = recordset.recordsets[1][0].AccountLogoBeforeUpdate;
                                        let previousImage = (AccountLogoBeforeUpdate)
                                            .replace(process.env.HOST_URL, RootDirectory)
                                            .replace('/images/', '/public/images/');
                                        console.log(previousImage);
                                        if (fs.existsSync(previousImage)) {
                                            fs.unlinkSync(previousImage);
                                        }
                                    }
                                    else if (Body_AccountDetails.StepCompleted == "AccountDetails") {
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
                                    if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
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
                                if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
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
                            if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
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
                        if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
                            if (fs.existsSync(uploadFilePath)) {
                                fs.unlinkSync(uploadFilePath)
                            }
                        }
                        return res.send(ServiceResult);
                    }
                });
            });
        }

    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        if (Body_AccountDetails.StepCompleted == "AdditionalInfo" && UserLogo_Multipart) {
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
        if ((Number(iPK_AccountId) <= 0 || Number(DeletedBy) <= 0) || (isNaN(Number(iPK_AccountId)) || isNaN(Number(DeletedBy)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(AccountId & DeletedBy) query params must be required a number & grater than zero!';
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

            request.input('iPK_AccountId', sql.BigInt, iPK_AccountId);
            request.input('iDeletedId', sql.BigInt, DeletedBy);

            request.execute("[dbo].[USP_DeleteAccount]", function (err, recordset) {
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
                            ServiceResult.Description = error;
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


module.exports = {
    GetAccountDetails,
    AddEditAccountDetails,
    DeleteAccountsDetails
}