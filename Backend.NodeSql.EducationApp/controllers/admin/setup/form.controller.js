'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');


const GetFormDetails = async (req, res, next) => {
/*  #swagger.tags = ['Admin.Form']
    #swagger.description = ''
*/
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_FormId = req.query.FormId;
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
            request.input('iPK_FormId', sql.BigInt, iPK_FormId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[dbo].[USP_GetFormDetails]", function (err, recordset) {
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

const AddEditFormDetails = async (req, res, next) => {
/*  #swagger.tags = ['Admin.Form']
    #swagger.description = ''
*/
    try {
        res.setHeader('Content-Type', 'application/json');
        
        var iPK_FormId = req.body.iPK_FormId;
        var cFormName = req.body.cFormName;
        var cControllerName = req.body.cControllerName;
        var cActionName = req.body.cActionName;
        var iFK_ParentId = req.body.iFK_ParentId;
        var iFK_SolutionId = req.body.iFK_SolutionId;
        var cClassName = req.body.cClassName;
        var cArea = req.body.cArea;
        var bIsActive = req.body.bIsActive;
        var iUserId = req.body.iUserId;
        var cImageName = req.body.cImageName;
        var cPlatFormType = req.body.cPlatFormType;

        await sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            
            request.input('iPK_FormId', sql.BigInt, iPK_FormId);
            request.input('cFormName', sql.NVarChar(100), cFormName);
            request.input('cControllerName', sql.NVarChar(100), cControllerName);
            request.input('cActionName', sql.NVarChar(30), cActionName);
            request.input('iFK_ParentId', sql.BigInt, iFK_ParentId);
            request.input('iFK_SolutionId', sql.BigInt, iFK_SolutionId);
            request.input('cClassName', sql.NVarChar(30), cClassName);
            request.input('cArea', sql.NVarChar(30), cArea);
            request.input('bIsActive', sql.BIT, bIsActive);
            request.input('iUserId', sql.BIGINT, iUserId);
            request.input('cImageName', sql.NVarChar(200), cImageName);
            request.input('cPlatFormType', sql.NVarChar(30), cPlatFormType);

            request.execute("[dbo].[JK_USP_AddEditForm]", function (err, recordset) {
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

const DeleteFormsDetails = async (req, res, next) => {
/*  #swagger.tags = ['Admin.Form']
    #swagger.description = ''
*/
    debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_FormId = req.query.FormId;
        var iUserId = req.query.DeletedBy;
       
        if ((Number(iPK_FormId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_FormId)) || isNaN(Number(iUserId)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormId & DeletedBy) query params must be required a number & grater than zero!';
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

            request.input('iPK_FormId', sql.BigInt, iPK_FormId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[USP_DeleteForm]", function (err, recordset) {
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


const GetAllParentFormsList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Form']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');
        
        await sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.execute("[dbo].[USP_GetAllParentFormsList]", function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
                }
                sql.close();
                if (recordset == null || recordset.recordsets.length <= 0) {
                    ServiceResult.Message = "Failed!";
                    ServiceResult.Description = "Process failed!";
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                    res.send(ServiceResult);
                }
                else {
                    var data = {
                        dataMessage: recordset.recordsets[0],
                        dataList: recordset.recordsets[1]

                    };
                    ServiceResult.Message = "Success";
                    ServiceResult.Description = "";
                    ServiceResult.Result = true;
                    ServiceResult.Data = data;
                    res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    GetFormDetails,
    AddEditFormDetails,
    DeleteFormsDetails,
    GetAllParentFormsList
}