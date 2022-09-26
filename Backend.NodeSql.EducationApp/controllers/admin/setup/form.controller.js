'use strict';
const config = require('../../../config');
const sql = require('mssql');


const GetFormDetails = async (req, res, next) => {
/*  #swagger.tags = ['Admin.Form']
    #swagger.description = ''
*/
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_FormId = req.params.PK_FormId;
        var iRowperPage = req.params.RowperPage;
        var iCurrentPage = req.params.CurrentPage;
        var cSearchBy = req.params.SearchBy;
        var cSearchValue = req.params.SearchValue;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('iPK_FormId', sql.BigInt, iPK_FormId);
            request.input('iRowperPage', sql.BigInt, iRowperPage);
            request.input('iCurrentPage', sql.BigInt, iCurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.BigInt, cSearchValue);
            request.execute("[dbo].[USP_GetFormDetails]", function (err, recordset) {
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

        sql.connect(config.sql, function (err) {
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
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_FormId = req.body.iPK_FormId;
        var iUserId = req.body.iUserId;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_FormId', sql.BigInt, iPK_FormId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[JK_USP_DeleteForm]", function (err, recordset) {
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

const GetParentFormsList = async (req, res, next) => {
/*  #swagger.tags = ['Admin.Form']
    #swagger.description = ''
*/
    try {
        res.setHeader('Content-Type', 'application/json');

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.execute("[dbo].[USP_GetParentForms]", function (err, recordset) {
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

module.exports = {
    GetFormDetails,
    AddEditFormDetails,
    DeleteFormsDetails,
    GetParentFormsList
}