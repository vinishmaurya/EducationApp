'use strict';
const config = require('../config');
const sql = require('mssql');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Importing date-and-time module
const date = require('date-and-time')
const ServiceResult = require('../models/serviceResult.model');

const AuthenticateUser = async (req, res, next) => {
    ///*  #swagger.tags = ['Authentication']
    //    #swagger.description = ''
    //*/
    try {
      

        res.setHeader('Content-Type', 'application/json');

        var cUserName = req.body.UserName;
        var cPassword = req.body.Password;
        var cGrantType = req.body.GrantType;
        var cRefreshToken = req.body.RefreshToken;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('cUserName', sql.NVarChar(200), cUserName);
            request.input('cPassword', sql.NVarChar(200), cPassword);
            request.input('cGrantType', sql.NVarChar(200), cGrantType);
            request.input('cRefreshToken', sql.NVarChar(200), cRefreshToken);
            request.input('iRefreshTokenExpiryTimeInMinutes', sql.NVarChar(200), process.env.REFRESH_TOKEN_EXPIRY);
            request.input('cIPAddress', sql.NVarChar(200), req.ip);

            request.execute("[dbo].[USP_SvcAuthenticateAPIUser]", function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
                }
                sql.close();

                if (recordset.recordsets[0][0].Message_Id == 1) {
                    // create JWTs
                    const accessToken = jwt.sign(
                        { "username": recordset.recordsets[1][0].UserName },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY + "m" }
                    );
                    const refreshToken = jwt.sign(
                        { "username": recordset.recordsets[1][0].UserName },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY + "m" }
                    );
                    //Save Token Info
                    try {
                        sql.connect(config.sql, function (err) {
                            if (err) console.log(err);

                            const now = new Date();
                            const dataFormat = "DD/MM/YYYY HH:mm:ss";
                            // create Request object
                            var request = new sql.Request();
                            request.input('cAccessToken', sql.VarChar(500), accessToken);
                            request.input('cExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat));
                            request.input('cTokenGeneratedDatetime', sql.VarChar(500), date.format(now, dataFormat));
                            request.input('cRefreshToken', sql.VarChar(500), refreshToken);
                            request.input('cRefreshTokenExpiryDatetime', sql.VarChar(500), date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat));
                            request.input('cUserName', sql.VarChar(500), recordset.recordsets[1][0].UserName);
                            request.input('cIPAddress', sql.VarChar(500), req.ip);
                            request.execute("[dbo].[USP_SvcSaveAuthenticatedUserDate]", function (err, recordset1) {
                                if (err) {
                                    console.log(err);
                                    sql.close();
                                }
                                sql.close();


                                ServiceResult.Message = recordset.recordsets[0][0].Message;
                                ServiceResult.Description = recordset1.recordsets[0][0].Message;
                                ServiceResult.Result = true;
                                ServiceResult.Data = {
                                    accessToken: accessToken,
                                    tokenGeneratedDatetime: date.format(now, dataFormat),
                                    expiryDatetime: date.format(date.addMinutes(now, process.env.ACCESS_TOKEN_EXPIRY), dataFormat),
                                    refreshTokenInfo: {
                                        refreshToken: refreshToken,
                                        expiryDatetime: date.format(date.addMinutes(now, process.env.REFRESH_TOKEN_EXPIRY), dataFormat)
                                    }
                                }

                                //console.log(ServiceResult);
                                res.send(ServiceResult);
                            });
                        });
                    } catch (error) {
                        res.status(400).send(error.message);
                    }
                }
                else {
                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                    res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    AuthenticateUser
}