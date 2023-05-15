'use strict';
const config = require('../../config');
const sql = require('mssql');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Importing date-and-time module
const date = require('date-and-time')
const ServiceResult = require('../../models/serviceResult.model');
const adminMstUserClcts = require('../../models/admin/setup/user.model');
const adminMstTokenFamilyClcts = require('../../models/admin/setup/tokenFamily.model');

const AuthenticateUser = async (req, res, next) => {
    ///*  #swagger.tags = ['Authentication']
    //    #swagger.description = ''
    //*/
    try {

        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        res.setHeader('Content-Type', 'application/json');

        var cUserName = req.body.UserName;
        var cPassword = req.body.Password;
        var cGrantType = req.body.GrantType;
        var cRefreshToken = req.body.RefreshToken;
        cGrantType = cGrantType ? cGrantType.toUpperCase(): "";
        if (!["PASSWORD", "REFRESHTOKEN"].includes(cGrantType)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = "Invalid grant type, kindly use grant only in ('Password' or 'RefreshToken')!";
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (["REFRESHTOKEN"].includes(cGrantType) && !cRefreshToken) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = "Grant type 'RefreshToken' values must be required in the RefreshToken parameter!";
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }

        

        var IsLoggedIn = false;
        var LoggedInUserInfo = null;
        if (cGrantType == "REFRESHTOKEN") {
            var UserTokenFamily = await adminMstTokenFamilyClcts.findOne({
                $and: [
                    { 'RefreshToken': cRefreshToken },
                    {
                        'ExpiryDatetime': {
                            "$gt": (new Date()),
                        }
                    },
                    { 'IPAddress': req.ip },
                    { 'IsActive': true },
                    { 'IsDeleted': false }
                ]
            });
            if (UserTokenFamily) {
                LoggedInUserInfo = await adminMstUserClcts.findById(UserTokenFamily.UserId);
                if (LoggedInUserInfo) {
                    await adminMstUserClcts.findByIdAndUpdate(
                        LoggedInUserInfo._id,
                        {
                            LastAPITokenFetchDatetime: (new Date())
                        },
                        { new: true, useFindAndModify: false }
                    )
                        .then(item => {
                            IsLoggedIn = true;
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

        }
        else if (cGrantType == "PASSWORD") {
            
            LoggedInUserInfo = await adminMstUserClcts.findOne({
                $and: [
                    { "UserName": cUserName },
                    { 'Password': cPassword },
                    { 'IsActive': true },
                    { IsDeleted: { $in: [false, null] } }
                ]
            });
            //var temp = LoggedInUserInfo1._id;
            if (LoggedInUserInfo) {
                await adminMstUserClcts.findByIdAndUpdate(
                    LoggedInUserInfo._id,
                    {
                        LastAPITokenFetchDatetime: (new Date())
                    },
                    { new: true, useFindAndModify: false }
                )
                    .then(item => {
                        IsLoggedIn = true;
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

        if (IsLoggedIn && LoggedInUserInfo) {
            IsLoggedIn = false;
            //create JWTs
            const accessToken = jwt.sign(
                { "username": cUserName },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY + "m" }
            );
            const refreshToken = jwt.sign(
                { "username": cUserName },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY + "m" }
            );
            //Save Token Info
            try {

                const now = new Date();
                let dataFormat = "YYYY-MM-DD[T00:00:00.000Z]";
                var UserTokenFamily = await adminMstTokenFamilyClcts.findOne(
                    // Find documents matching of these values
                    {
                        $and: [
                            { "UserId": LoggedInUserInfo._id },
                            { 'IsActive': true },
                            { IsDeleted: { $in: [false, null] } }
                        ]
                    }
                );

                if (UserTokenFamily) {
                    //Update case
                    await adminMstTokenFamilyClcts.findByIdAndUpdate(
                        UserTokenFamily._id,
                        {
                            UserId: LoggedInUserInfo._id,
                            IPAddress: req.ip,
                            CreatedDatetime: (new Date()),
                            AccessToken: accessToken,
                            ExpiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
                            TokenGeneratedDatetime: date.format(now, dataFormat),
                            RefreshToken: refreshToken,
                            RefreshTokenExpiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat),
                            UserName: cUserName,
                            IsActive: true,
                            IsDeleted: false,
                        },
                        { new: true, useFindAndModify: false }
                    )
                        .then(item => {
                            //Success, Token Details updated into token family!
                            IsLoggedIn = true;
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
                    const objAdminMstTokenFamilyClcts = new adminMstTokenFamilyClcts({
                        UserId: LoggedInUserInfo._id,
                        IPAddress: req.ip,
                        CreatedDatetime: (new Date()),
                        AccessToken: accessToken,
                        ExpiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
                        TokenGeneratedDatetime: date.format(now, dataFormat),
                        RefreshToken: refreshToken,
                        RefreshTokenExpiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat),
                        UserName: cUserName,
                        IsActive: true,
                        IsDeleted: false,
                    });
                    await objAdminMstTokenFamilyClcts.save()
                        .then(item => {
                            //Success, Token Details added into token family!
                            IsLoggedIn = true;
                        })
                        .catch(err => {
                            ServiceResult.Message = "API Internal Error!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = err.message;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        });
                }

                if (IsLoggedIn) {
                    dataFormat = "DD/MM/YYYY HH:MM:SS";
                    let tokenInfo = {
                        accessToken: accessToken,
                        tokenGeneratedDatetime: date.format(now, dataFormat),
                        expiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
                        refreshTokenInfo: {
                            refreshToken: refreshToken,
                            expiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat)
                        }
                    }
                    ServiceResult.Message = "Success!";
                    ServiceResult.Description = null;
                    ServiceResult.Result = true;
                    ServiceResult.Data = tokenInfo;

                    //console.log(ServiceResult);
                    res.send(ServiceResult);
                }


                //sql.connect(config.sql, function (err) {
                //    if (err) console.log(err);

                //    const now = new Date();
                //    const dataFormat = "YYYY-DD/MM hh:mm:ss A";
                //    //console.log(date.format(now, dataFormat));
                //    // create Request object
                //    var request = new sql.Request();
                //    request.input('cAccessToken', sql.VarChar(500), accessToken);
                //    request.input('cExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat));
                //    request.input('cTokenGeneratedDatetime', sql.VarChar(500), date.format(now, dataFormat));
                //    request.input('cRefreshToken', sql.VarChar(500), refreshToken);
                //    request.input('cRefreshTokenExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat));
                //    request.input('cUserName', sql.VarChar(500), cUserName);
                //    request.input('cIPAddress', sql.VarChar(500), req.ip);
                //    request.execute("[dbo].[USP_SvcSaveAuthenticatedUserData]", function (err, recordset1) {
                //        if (err) {
                //            console.log(err);
                //            sql.close();
                //        }
                //        sql.close();

                //        let tokenInfo = {
                //            accessToken: accessToken,
                //            tokenGeneratedDatetime: date.format(now, dataFormat),
                //            expiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
                //            refreshTokenInfo: {
                //                refreshToken: refreshToken,
                //                expiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat)
                //            }
                //        }
                //        ServiceResult.Message = recordset.recordsets[0][0].Message;
                //        ServiceResult.Description = recordset1.recordsets[0][0].Message;
                //        ServiceResult.Result = true;
                //        ServiceResult.Data = tokenInfo;

                //        //console.log(ServiceResult);
                //        res.send(ServiceResult);
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
        else {
            ServiceResult.Message = "Authenticaion Failed!";
            ServiceResult.Result = false;
            ServiceResult.Description = "Invalid User Credentials!";
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('cUserName', sql.NVarChar(200), cUserName);
        //    request.input('cPassword', sql.NVarChar(200), cPassword);
        //    request.input('cGrantType', sql.NVarChar(200), cGrantType);
        //    request.input('cRefreshToken', sql.NVarChar(200), cRefreshToken);
        //    request.input('iRefreshTokenExpiryTimeInMinutes', sql.NVarChar(200), process.env.REFRESH_TOKEN_EXPIRY);
        //    request.input('cIPAddress', sql.NVarChar(200), req.ip);

        //    request.execute("[dbo].[USP_SvcAuthenticateAPIUser]", function (err, recordset) {
        //        if (err) {
        //            console.log(err);
        //            sql.close();
        //        }
        //        sql.close();
        //        //console.log(recordset);
        //        if (recordset.recordsets[0][0].Message_Id == 1) {
        //            // create JWTs
        //            const accessToken = jwt.sign(
        //                { "username": cUserName },
        //                process.env.ACCESS_TOKEN_SECRET,
        //                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY + "m" }
        //            );
        //            const refreshToken = jwt.sign(
        //                { "username": cUserName },
        //                process.env.REFRESH_TOKEN_SECRET,
        //                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY + "m" }
        //            );
        //            //Save Token Info
        //            try {
        //                sql.connect(config.sql, function (err) {
        //                    if (err) console.log(err);

        //                    const now = new Date();
        //                    const dataFormat = "YYYY-DD/MM hh:mm:ss A";
        //                    //console.log(date.format(now, dataFormat));
        //                    // create Request object
        //                    var request = new sql.Request();
        //                    request.input('cAccessToken', sql.VarChar(500), accessToken);
        //                    request.input('cExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat));
        //                    request.input('cTokenGeneratedDatetime', sql.VarChar(500), date.format(now, dataFormat));
        //                    request.input('cRefreshToken', sql.VarChar(500), refreshToken);
        //                    request.input('cRefreshTokenExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat));
        //                    request.input('cUserName', sql.VarChar(500), cUserName);
        //                    request.input('cIPAddress', sql.VarChar(500), req.ip);
        //                    request.execute("[dbo].[USP_SvcSaveAuthenticatedUserData]", function (err, recordset1) {
        //                        if (err) {
        //                            console.log(err);
        //                            sql.close();
        //                        }
        //                        sql.close();

        //                        let tokenInfo = {
        //                            accessToken: accessToken,
        //                            tokenGeneratedDatetime: date.format(now, dataFormat),
        //                            expiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
        //                            refreshTokenInfo: {
        //                                refreshToken: refreshToken,
        //                                expiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat)
        //                            }
        //                        }
        //                        ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                        ServiceResult.Description = recordset1.recordsets[0][0].Message;
        //                        ServiceResult.Result = true;
        //                        ServiceResult.Data = tokenInfo;

        //                        //console.log(ServiceResult);
        //                        res.send(ServiceResult);
        //                    });
        //                });
        //            } catch (error) {
        //                res.status(400).send(error.message);
        //            }
        //        }
        //        else {
        //            ServiceResult.Message = recordset.recordsets[0][0].Message;
        //            res.send(ServiceResult);
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

module.exports = {
    AuthenticateUser
}