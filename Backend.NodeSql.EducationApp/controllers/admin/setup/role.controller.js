'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
// Network interfaces
var ifaces = require('os').networkInterfaces();


const GetRoleDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */

    //console.log(req.socket.remoteAddress);
    //console.log(req.ip);

    //// Iterate over interfaces ...
    //var adresses = Object.keys(ifaces).reduce(function (result, dev) {
    //    return result.concat(ifaces[dev].reduce(function (result, details) {
    //        return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
    //    }, []));
    //});

    //// Print the result
    //console.log(adresses)



    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_RoleId = req.params.PK_RoleId;
        var iRowperPage = req.params.RowperPage;
        var iCurrentPage = req.params.CurrentPage;
        var cSearchBy = req.params.SearchBy;
        var cSearchValue = req.params.SearchValue;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
            request.input('iRowperPage', sql.BigInt, iRowperPage);
            request.input('iCurrentPage', sql.BigInt, iCurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[dbo].[USP_GetRoleDetails]", function (err, recordset) {
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
                        dataHeader: recordset.recordsets[1],
                        dataList: recordset.recordsets[2],
                        dataCount: recordset.recordsets[3],
                        
                    };
                    ServiceResult.Message = recordset.recordsets[0][0].Message;
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

const AddEditRoleDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_RoleId = req.body.PK_RoleId;
        var cRoleName = req.body.RoleName;
        var FK_CategoryId = req.body.FK_CategoryId;
        var iHomePage = req.body.HomePage;
        var IsActive = req.body.IsActive;
        var CreatedBy = req.body.CreatedBy;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
            request.input('cRoleName', sql.NVarChar(100), cRoleName);
            request.input('iFK_CategoryId', sql.NVarChar(100), FK_CategoryId);
            request.input('iHomePage', sql.BigInt, iHomePage);
            request.input('bIsActive', sql.Bit, IsActive);
            request.input('iUserId', sql.BigInt, CreatedBy);
            request.execute("[dbo].[USP_AddEditRole]", function (err, recordset) {
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
                    var PK_RoleId = null;
                    if (recordset.recordsets[0][0].Message_Id == 1) {
                        PK_RoleId = recordset.recordsets[0][1].PK_RoleId;
                    }
                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                    ServiceResult.Description = "";
                    ServiceResult.Result = true;
                    ServiceResult.Data = PK_RoleId;
                    res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const DeleteRolesDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_RoleId = req.body.PK_RoleId;
        var iUserId = req.body.DeletedBy;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[USP_DeleteRole]", function (err, recordset) {
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
                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                    ServiceResult.Description = "";
                    ServiceResult.Result = true;
                    ServiceResult.Data = null;
                    res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const GetRolesList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();


            request.execute("[dbo].[USP_GetAllRoles]", function (err, recordset) {
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
                    ServiceResult.Message = "Success";
                    ServiceResult.Description = "";
                    ServiceResult.Result = true;
                    ServiceResult.Data = recordset.recordsets[0];
                    res.send(ServiceResult);
                }
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    GetRoleDetails,
    AddEditRoleDetails,
    DeleteRolesDetails,
    GetRolesList
}