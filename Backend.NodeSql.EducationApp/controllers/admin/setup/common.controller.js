'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');

const GetAllCategoryList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.execute("[dbo].[USP_GetAllCategoryList]", function (err, recordset) {
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


const GetAllAccountList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.execute("[dbo].[USP_GetAllAccountList]", function (err, recordset) {
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


const GetAllParentFormsList = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Common']
        #swagger.description = ''
    */
    try {
        res.setHeader('Content-Type', 'application/json');

        sql.connect(config.sql, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();

            request.execute("[dbo].[USP_GetAllParentFormsList]", function (err, recordset) {
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
    GetAllCategoryList,
    GetAllAccountList,
    GetAllParentFormsList
}