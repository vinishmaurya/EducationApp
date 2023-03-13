'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');


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
            request.execute("[dbo].[USP_GetuserDetails]", function (err, recordset) {
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

const AddEditUserDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.User']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_UserId = req.body.iPK_UserId;
        var iUserId = req.body.iUserId;
        var cUserName = req.body.cUserName;
        var FK_RoleId = req.body.FK_RoleId;
        var UserPassword = req.body.UserPassword;
        var MobileNo = req.body.MobileNo;
        var AlternateMobileNo = req.body.AlternateMobileNo;
        var EmailId = req.body.EmailId;
        var Gender = req.body.Gender;
        var DateOfBirth = req.body.DateOfBirth;
        var UserAddress = req.body.UserAddress;
        var ZipCode = req.body.ZipCode;
        var bIsActive = req.body.IsActive;
        var Name = req.body.Name;

        await sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_userId', sql.BigInt, iPK_UserId);
            request.input('iUserId', sql.BIGINT, iUserId);
            request.input('cUserName', sql.NVarChar(100), cUserName);
            request.input('FK_RoleId', sql.BIGINT, FK_RoleId);
            request.input('UserPassword', sql.NVarChar(100), UserPassword);
            request.input('MobileNo', sql.NVarChar(100), MobileNo);
            request.input('AlternateMobileNo', sql.NVarChar(100), AlternateMobileNo);
            request.input('EmailId', sql.NVarChar(100), EmailId);
            request.input('Gender', sql.NVarChar(100), Gender);
            request.input('EmailId', sql.NVarChar(100), EmailId);
            request.input('DateOfBirth', sql.NVarChar(100), DateOfBirth);
            request.input('UserAddress', sql.NVarChar(500), UserAddress);
            request.input('ZipCode', sql.NVarChar(100), ZipCode);
            request.input('bIsActive', sql.BIT, bIsActive);
            request.input('Name', sql.NVarChar(100), Name);
            request.execute("[dbo].[USP_AddEdituser]", function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
                }
                sql.close();
                res.send(recordset.recordsets);

            });
        });
    } catch (error) {
        res.status(400).send(error.message);
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
        await sql.connect(config.sql, function (err) {
            if (err) {
                ServiceResult.Message = "Failed to parse api response!";
                ServiceResult.Description = err;
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            // create Request object
            var request = new sql.Request();

            request.input('iPK_userId', sql.BigInt, iPK_userId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[USP_Deleteuser]", function (err, recordset) {
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
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader.split(' ')[1];

        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        var cUserName = req.body.UserName;
        var cPassword = req.body.Password;

        await sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('cAccessToken', sql.NVarChar(300), accessToken);

            request.execute("[dbo].[USP_SvcAuthenticatedAPIUserInfo]", function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
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


        var conn = new sql.ConnectionPool(config.sql);
        conn.connect().then(function (conn) {
            //if (err) console.log(err);
            // create Request object
            var request = new sql.Request(conn);

            request.input('cAccessToken', sql.NVarChar(300), accessToken);

            request.execute("[dbo].[USP_SvcAuthenticatedAPIUserTokenValidation]", function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
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