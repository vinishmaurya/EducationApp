'use strict';
const config = require('../../../config');
const sql = require('mssql');


const GetSubMenuDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Role']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_RoleId = req.params.PK_RoleId;
        var iPK_FormId = req.params.PK_FormId;
        var cMappingFor = req.params.MappingFor;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
            request.input('iRowperPage', sql.BigInt, iPK_FormId);
            request.input('cMappingFor', sql.BigInt, cMappingFor);
            request.execute("[dbo].[USP_GetRoleFormMappingWithFormId]", function (err, recordset) {
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

const AddEditMapFormRoleDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Map.Form.Role']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_RoleId = req.body.FK_FormId;
        var FK_RoleId = req.body.FK_RoleId;
        var CanAdd = req.body.CanAdd;
        var CanEdit = req.body.CanEdit;
        var CanDelete = req.body.CanDelete;
        var CanView = req.body.CanView;
        var CanExport = req.body.CanExport;
        var IsActive = req.body.IsActive;
        var CreatedBy = req.body.CreatedBy;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
            request.input('FK_RoleId', sql.NVarChar(100), FK_RoleId);
            request.input('CanAdd', sql.BigInt, CanAdd);
            request.input('CanEdit', sql.NVarChar(30), CanEdit);
            request.input('CanDelete', sql.NVarChar(30), CanDelete);
            request.input('CanView', sql.NVarChar(30), CanView);
            request.input('CanExport', sql.NVarChar(30), CanExport);
            request.input('IsActive', sql.Bit, IsActive);
            request.input('CreatedBy', sql.BigInt, CreatedBy);
            request.execute("[dbo].[JK_USP_MapFormRoleAddEdit]", function (err, recordset) {
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
    GetSubMenuDetails,
    AddEditMapFormRoleDetails
}