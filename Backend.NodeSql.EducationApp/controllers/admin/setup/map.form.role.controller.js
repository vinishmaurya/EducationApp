'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');

const GetAllFormRoleMappings = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Role']
        #swagger.description = ''
    */
    try {
        ServiceResult.Message = null;
        ServiceResult.Description = null;
        ServiceResult.Result = null;
        ServiceResult.Data = null;

        let RoleId = req.query.RoleId ? req.query.RoleId : 0;
        let FormId = req.query.FormId ? req.query.FormId : 0;
        let MappingFor = req.query.MappingFor ? req.query.MappingFor : '';
        let AccountId = req.query.AccountId ? req.query.AccountId : 0;

        res.setHeader('Content-Type', 'application/json');

        await sql.connect(config.sql, function (err) {
            if (err) {
                sql.close();
                ServiceResult.Message = "Failed to parse api response!";
                ServiceResult.Description = err.message;
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
            // create Request object
            var request = new sql.Request();

            request.input('iPK_RoleId', sql.BigInt, RoleId);
            request.input('iPK_FormId', sql.BigInt, FormId);
            request.input('cMappingFor', sql.VarChar(100), MappingFor);
            request.input('iAccountId', sql.BigInt, AccountId);

            request.execute("[dbo].[USP_GetAllFormRoleMappings]", function (err, recordset) {
                if (err) {
                    console.log(err);
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
                                HeaderList: recordset.recordsets[1] ? recordset.recordsets[1] : [],
                                DataList: recordset.recordsets[2] ? recordset.recordsets[2] : [],
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
        ServiceResult.Message = "Failed to connect db!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditFormRoleMappings = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Role']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var JsonData = req.body;

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

                request.input('cJsonData', sql.NVarChar(sql.MAX), JSON.stringify(JsonData));

                request.execute("[dbo].[USP_AddEditFormRoleMappings]", function (err, recordset) {
                    try {
                        if (err) {
                            console.log(err);
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
                                ServiceResult.Message = recordset.recordsets[0][0].Message;
                                ServiceResult.Result = true;
                                ServiceResult.Description = null;
                                ServiceResult.Data = null;
                                return res.send(ServiceResult);
                            }
                            else {
                                ServiceResult.Message = recordset.recordsets[0][0].Message;
                                ServiceResult.Result = false;
                                ServiceResult.Description = null;
                                ServiceResult.Data = null;
                                return res.send(ServiceResult);
                            }
                        }
                        else {
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = null;
                            ServiceResult.Data = null;
                            return res.send(ServiceResult);
                        }
                    } catch (e) {
                        ServiceResult.Message = 'API Internal Error!';
                        ServiceResult.Description = null;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        ServiceResult.Description = JSON.stringify(e.message);
                        return res.send(ServiceResult);
                    }
                });
            } catch (e) {
                ServiceResult.Message = "API Internal Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = e.message;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
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
    GetAllFormRoleMappings,
    AddEditFormRoleMappings,
}