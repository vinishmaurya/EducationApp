'use strict';
const config = require('../../../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../../../models/serviceResult.model');

const GetChapterTopicsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.ChapterTopics']
        #swagger.description = ''
    */
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_ChapterTopicsId = req.query.ChapterTopicsId;
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
        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise
            request.input('iPK_ChapterTopicsId', sql.BigInt, iPK_ChapterTopicsId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[ACAD].[USP_SvcGetChapterTopicsDetails]", function (err, recordset) {
                if (err) {
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
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}




const AddEditChapterTopicsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.ChapterTopics']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_ChapterTopicsId = req.body.ChapterTopicsId;
        var iMediumId = req.body.MediumId;
        var cChapterTopicsName = req.body.ChapterTopicsName;
        var iSectionIds = req.body.SectionIds;
        var bIsActive = req.body.IsActive === "true" ? true : false;
        var iUserId = req.body.CreatedBy;

        if (
            Number(cChapterTopicsName) === '' ||
            Number(iUserId) <= 0 ||
            isNaN(Number(iUserId))
        ) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(ChapterTopicsName, CreatedBy) body parameters must be required and valid!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (isNaN(Number(iPK_ChapterTopicsId))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(ChapterTopicsId) body parameters must be contains valid numbers or zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        res.setHeader('Content-Type', 'application/json');
        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise

            request.input('iPK_ChapterTopicsId', sql.BigInt, iPK_ChapterTopicsId);
            request.input('iMediumId', sql.BigInt, iMediumId);
            request.input('cChapterTopicsName', sql.NVarChar(100), cChapterTopicsName);
            request.input('iSectionIds', sql.NVarChar(100), iSectionIds);
            request.input('bIsActive', sql.BIT, bIsActive);
            request.input('iUserId', sql.BIGINT, iUserId);

            request.execute("[ACAD].[USP_SvcAddEditChapterTopics]", function (err, recordset) {
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
        });
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const DeleteChapterTopicssDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.ChapterTopics']
        #swagger.description = ''
    */
    //debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_ChapterTopicsId = req.query.ChapterTopicsId;
        var iUserId = req.query.DeletedBy;

        if ((Number(iPK_ChapterTopicsId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_ChapterTopicsId)) || isNaN(Number(iUserId)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(ChapterTopicsId & DeletedBy) query params must be required a number & grater than zero!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var poolPromise = new sql.ConnectionPool(config.sql);
        await poolPromise.connect().then(function (pool) {
            //the pool that is created and should be used
            // create Request object
            var request = new sql.Request(pool);
            //the pool from the promise

            request.input('iPK_ChapterTopicsId', sql.BigInt, iPK_ChapterTopicsId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[ACAD].[USP_SvcDeleteChapterTopics]", function (err, recordset) {
                if (err) {
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
                        try {
                            ServiceResult.Message = recordset.recordsets[0][0].Message;
                            ServiceResult.Description = null;
                            ServiceResult.Result = true;
                            ServiceResult.Data = null;
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
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}


module.exports = {
    GetChapterTopicsDetails,
    AddEditChapterTopicsDetails,
    DeleteChapterTopicssDetails
}