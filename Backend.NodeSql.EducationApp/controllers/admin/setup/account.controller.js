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
        debugger;
        res.setHeader('Content-Type', 'application/json');
        var AccountId = req.query.AccountId;
        var RowperPage = req.query.RowperPage;
        var CurrentPage = req.query.CurrentPage;
        var SearchBy = req.query.SearchBy;
        var SearchValue = req.query.SearchValue;
        if ((Number(RowperPage) <= 0 || Number(CurrentPage) <= 0) || (isNaN(Number(RowperPage)) || isNaN(Number(CurrentPage)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RowperPage & CurrentPage) query params must be required a number & grater than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('iPK_AccountId', sql.BigInt, AccountId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), SearchBy);
            request.input('cSearchValue', sql.BigInt, SearchValue);
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
                                CountArray: recordset.recordsets[2][0],
                                DataList: recordset.recordsets[1]
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
        res.status(400).send(error.message);
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
    try {
        debugger;
        let message = "", bool = true, AccountLogo_Multipart = null, Body_AccountDetails = null;
        JSON.stringify(Object.keys(req.files));
        if (!req.files || Object.keys(req.files).length <= 0) {
            message = "No files were uploaded for account logo!";
            bool = false;
        }
        else if (Object.keys(req.files) != "AccountLogo") {
            message = "No files were uploaded for account logo with key ('AccountLogo')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            AccountLogo_Multipart = req.files.AccountLogo;
        }
        if (Object.keys(req.body) != "AccountDetails") {
            message = "No were data found for account logo with key ('AccountDetails')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            Body_AccountDetails = JSON.parse(req.body.AccountDetails);
        }
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
            
            res.setHeader('Content-Type', 'application/json');
            console.log(Body_AccountDetails);
            var iPK_AccountId = Body_AccountDetails.AccountId;
            var cAccountName = Body_AccountDetails.AccountName;
            var FK_CategoryId = Body_AccountDetails.CategoryId;
            var ParentAccountId = Body_AccountDetails.ParentAccountId;
            var cContactPerson = Body_AccountDetails.ContactPerson;
            var MobileNo = Body_AccountDetails.MobileNo;
            var AlternateMobileNo = Body_AccountDetails.AlternateMobileNo;
            var EmailId = Body_AccountDetails.EmailId;
            var AccountAddress = Body_AccountDetails.AccountAddress;
            var ZipCode = Body_AccountDetails.ZipCode;
            var bIsActive = Body_AccountDetails.IsActive;
            var FK_CountryID = Body_AccountDetails.CountryID;
            var FK_StateID = Body_AccountDetails.StateID;
            var FK_CityID = Body_AccountDetails.CityID;
            var CreatedBy = Body_AccountDetails.CreatedBy;
            var Username = Body_AccountDetails.Username;
            var Password = Body_AccountDetails.Password;

            sql.connect(config.sql, function (err) {
                if (err) console.log(err);
                // create Request object
                var request = new sql.Request();

                request.input('iPK_AccountId', sql.BigInt, iPK_AccountId);
                request.input('cAccountName', sql.NVarChar(100), cAccountName);
                request.input('iFK_CategoryId', sql.BIGINT, FK_CategoryId);
                request.input('iParentAccountId', sql.BIGINT, ParentAccountId);
                request.input('cContactPerson', sql.NVarChar(100), cContactPerson);
                request.input('cMobileNo', sql.NVarChar(100), MobileNo);
                request.input('cAlternateMobileNo', sql.NVarChar(100), AlternateMobileNo);
                request.input('cEmailId', sql.NVarChar(100), EmailId);
                request.input('bIsActive', sql.BIT, bIsActive);
                request.input('cAccountLogo', sql.NVarChar(100), uploadedFileUrl);

                request.input('cAccountAddress', sql.NVarChar(500), AccountAddress);
                request.input('cZipCode', sql.NVarChar(100), ZipCode);
                request.input('iFK_CountryId', sql.NVarChar(100), FK_CountryID);
                request.input('iFK_StateId', sql.NVarChar(100), FK_StateID);
                request.input('iFK_CityId', sql.NVarChar(100), FK_CityID);
                request.input('CreatedBy', sql.BigInt, CreatedBy);
                request.input('Username', sql.NVarChar(100), Username);
                request.input('Password', sql.NVarChar(100), Password);
                

                request.execute("[dbo].[USP_AddEditAccount]", function (err, recordset) {
                    if (err) {
                        console.log(err);
                        sql.close();
                        ServiceResult.Message = "Failed to parse api response!";
                        ServiceResult.Description = err;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        if (fs.existsSync(uploadFilePath)) {
                            fs.unlinkSync(uploadFilePath)
                        }
                        return res.send(ServiceResult);
                    }
                    sql.close();
                    if (recordset) {
                        if (recordset.recordsets[0][0].Message_Id == 1) {

                            try {
                                //Success Case
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
                                if (fs.existsSync(uploadFilePath)) {
                                    fs.unlinkSync(uploadFilePath)
                                }
                                return res.send(ServiceResult);
                            }
                        }
                        else {
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            if (fs.existsSync(uploadFilePath)) {
                                fs.unlinkSync(uploadFilePath)
                            }
                            return res.send(ServiceResult);
                        }
                    }
                    else {
                        ServiceResult.Message = "Failed to parse api response!";
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        if (fs.existsSync(uploadFilePath)) {
                            fs.unlinkSync(uploadFilePath)
                        }
                        return res.send(ServiceResult);
                    }
                });
            });
        }

    } catch (error) {
        ServiceResult.Message = "Failed!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        if (fs.existsSync(uploadFilePath)) {
            fs.unlinkSync(uploadFilePath)
        }
        return res.send(ServiceResult);
    }
}

const DeleteAccountsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Account']
        #swagger.description = ''
    */
    debugger;
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
        sql.connect(config.sql, function (err) {
            if (err) {
                ServiceResult.Message = "Failed to parse api response!";
                ServiceResult.Description = err;
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            // create Request object
            var request = new sql.Request();

            request.input('iPK_AccountId', sql.BigInt, iPK_AccountId);
            request.input('iDeletedId', sql.BigInt, DeletedBy);

            request.execute("[dbo].[USP_DeleteAccount]", function (err, recordset) {
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
        ServiceResult.Message = "Failed!";
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