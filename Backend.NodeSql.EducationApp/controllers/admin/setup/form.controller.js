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
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_FormId = req.body.FormId;
        var cFormName = req.body.FormName;
        var cControllerName = req.body.ComponentName;
        var SPA_ComponentHref = req.body.ComponentPath;
        var cActionName = req.body.LandingComponentName;
        var iFK_ParentId = req.body.ParentFormId;
        var iFK_SolutionId = req.body.SolutionId;
        var cClassName = req.body.ClassName;
        var cArea = req.body.Area;
        var bIsActive = req.body.IsActive === "true" ? true : false;
        var iUserId = req.body.CreatedBy;
        var cImageName = req.body.ImageName;
        var cPlatFormType = req.body.PlatFormType;

        if (
            Number(cFormName) === '' ||
            Number(iUserId) <= 0 ||
            Number(cControllerName) === '' ||
            Number(SPA_ComponentHref) === '' ||
            isNaN(Number(iUserId))
        ) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormName, ComponentName, ComponentPath, PlatFormType, CreatedBy) body parameters must be required and valid!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (isNaN(Number(iFK_ParentId)) || isNaN(Number(iPK_FormId))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormId, SolutionId, ParentId, IsActive) body parameters must be contains valid numbers or zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if ((Number(iFK_SolutionId)) < 0 || (Number(iFK_ParentId)) < 0 || (Number(bIsActive)) < 0 || (Number(iPK_FormId)) < 0) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(FormId, SolutionId, ParentId, IsActive) body parameters must be contains valid numbers or grater than or equals than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        res.setHeader('Content-Type', 'application/json');
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

                request.input('iPK_FormId', sql.BigInt, iPK_FormId);
                request.input('cFormName', sql.NVarChar(100), cFormName);
                request.input('cControllerName', sql.NVarChar(100), cControllerName);
                request.input('cSPA_ComponentHref', sql.NVarChar(500), SPA_ComponentHref);
                request.input('cActionName', sql.NVarChar(30), cActionName);
                request.input('iFK_ParentId', sql.BigInt, iFK_ParentId);
                request.input('iFK_SolutionId', sql.BigInt, iFK_SolutionId);
                request.input('cClassName', sql.NVarChar(30), cClassName);
                request.input('cArea', sql.NVarChar(30), cArea);
                request.input('bIsActive', sql.BIT, bIsActive);
                request.input('iUserId', sql.BIGINT, iUserId);
                request.input('cImageName', sql.NVarChar(200), cImageName);
                request.input('cPlatFormType', sql.NVarChar(30), cPlatFormType);


                request.execute("[dbo].[USP_AddEditForm]", function (err, recordset) {
                    try {
                        if (err) {
                            console.log(err);
                            sql.close();
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = JSON.stringify(err);
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


module.exports = {
    GetFormDetails,
    AddEditFormDetails,
    DeleteFormsDetails
}