'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');


const GetUserDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.User']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_UserId = req.params.PK_UserId;
        var iRowperPage = req.params.RowperPage;
        var iCurrentPage = req.params.CurrentPage;
        var cSearchBy = req.params.SearchBy;
        var cSearchValue = req.params.SearchValue;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('iPK_UserId', sql.BigInt, iPK_UserId);
            request.input('iRowperPage', sql.BigInt, iRowperPage);
            request.input('iCurrentPage', sql.BigInt, iCurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.BigInt, cSearchValue);
            request.execute("[dbo].[USP_GetuserDetails]", function (err, recordset) {
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

        sql.connect(config.sql, function (err) {
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
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_userId = req.body.iPK_userId;
        var iUserId = req.body.iUserId;

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.input('iPK_userId', sql.BigInt, iPK_userId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[dbo].[USP_Deleteuser]", function (err, recordset) {
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
    GetUserDetails,
    AddEditUserDetails,
    DeleteUsersDetails
}