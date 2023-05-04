'use strict';
const config = require('../../../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../../../models/serviceResult.model');
const fs = require('fs-extra');
const date = require('date-and-time');

const GetSubjectDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.Subject']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_SubjectId = req.query.SubjectId;
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
            request.input('iPK_SubjectId', sql.BigInt, iPK_SubjectId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[ACAD].[USP_SvcGetSubjectDetails]", function (err, recordset) {
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



const AddEditSubjectDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.Subject']
        #swagger.description = ''
    */
    var uploadFilePath = null;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    let message = "", bool = true, SubjectImage_Multipart = null, Body_SubjectDetails = null;


    try {
        //debugger;


        if (Object.keys(req.body) != "SubjectDetails") {
            message = "No were data found for Subject details with form data key ('SubjectDetails')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            Body_SubjectDetails = JSON.parse(req.body.SubjectDetails);
        }
        if (bool) {
            if (req.files) {
                if ((!req.files || Object.keys(req.files).length <= 0)) {
                    message = "No files were uploaded for Subject logo!";
                    bool = false;
                }
                else if (Object.keys(req.files) != "SubjectImage") {
                    message = "No files were uploaded for Subject logo with form data key ('SubjectImage')!";
                    //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                    //return;
                    bool = false;
                }
                else {
                    SubjectImage_Multipart = req.files.SubjectImage;
                    let fileName = SubjectImage_Multipart.name;
                    let extension = fileName.substr(fileName.lastIndexOf('.'), fileName.length - fileName.lastIndexOf('.')).toUpperCase();
                    //Size and format validations
                    if (["PNG", "JPEG", "JPG"].includes(extension)) {
                        message = "Invalid Subject logo Image format? only (jpg,jpeg,png) images are required!";
                        bool = false;
                    }
                    else if ((SubjectImage_Multipart.size / (1000 * 1000)) > 1) {
                        message = "Invalid Subject logo Image size? Only 1MB image are valid!";
                        bool = false;
                    }
                }
            }
        }

        if (!bool) {
            ServiceResult.Message = "Validatio Error!";
            ServiceResult.Description = message;
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        else {
            //Validation Success
            var uploadedFileUrl = "";
            if (SubjectImage_Multipart) {
                var RootDirectory = require('path').resolve();
                RootDirectory = `${RootDirectory}/public/images/app_images/Subject_logo/`
                if (!fs.existsSync(RootDirectory)) {
                    fs.mkdirSync(RootDirectory, { recursive: true });
                }
                let fileName_orignal = SubjectImage_Multipart ? SubjectImage_Multipart.name : "";
                let extension = fileName_orignal.substr(fileName_orignal.lastIndexOf('.'), fileName_orignal.length - fileName_orignal.lastIndexOf('.')).toUpperCase();

                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + extension;
                uploadedFileUrl = `${process.env.HOST_URL}/images/app_images/Subject_logo/` + fileName;
                uploadFilePath = RootDirectory + fileName;
                fs.writeFile(uploadFilePath, SubjectImage_Multipart.data, { encoding: 'base64' }, function (err) {
                    ServiceResult.Message = 'Failed while file save!';
                    ServiceResult.Description = err;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                });
            }
            res.setHeader('Content-Type', 'application/json');
            console.log(Body_SubjectDetails);

            var poolPromise = new sql.ConnectionPool(config.sql);
            await poolPromise.connect().then(function (pool) {
                //the pool that is created and should be used
                // create Request object
                var request = new sql.Request(pool);
                //the pool from the promise

                request.input('iPK_SubjectId', sql.BigInt, Body_SubjectDetails.SubjectId);
                request.input('iMediumId', sql.Int, Body_SubjectDetails.MediumId);
                request.input('cSubjectName', sql.NVarChar(200), Body_SubjectDetails.SubjectName);
                request.input('cSubjectType', sql.NVarChar(200), Body_SubjectDetails.SubjectType);
                request.input('cSubjectCode', sql.NVarChar(200), Body_SubjectDetails.SubjectCode);
                request.input('cBackgroundColorCode', sql.NVarChar(200), Body_SubjectDetails.BackgroundColorCode);
                request.input('cSubjectImageUrl', sql.NVarChar(500), uploadedFileUrl);
                request.input('bIsActive', sql.BIT, Body_SubjectDetails.IsActive === "true" ? true : false);
                request.input('iUserId', sql.BIGINT, Body_SubjectDetails.CreatedBy);

                request.execute("[ACAD].[USP_SvcAddEditSubject]", function (err, recordset) {
                    try {
                        if (err) {
                            //console.log(err);
                            sql.close();
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = JSON.stringify(err);
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            if (fs.existsSync(uploadFilePath)) {
                                fs.unlinkSync(uploadFilePath)
                            }
                            return res.send(ServiceResult);
                        }
                        sql.close();
                        if (recordset) {
                            if (recordset.recordsets[0][0].Message_Id == 1) {
                                try {
                                    if (Body_SubjectDetails.SubjectId != 0 && uploadedFileUrl) {
                                        RootDirectory = require('path').resolve();
                                        let SubjectImageBeforeUpdate = recordset.recordsets[1][0].SubjectImageBeforeUpdate;
                                        let previousImage = (SubjectImageBeforeUpdate)
                                            .replace(process.env.HOST_URL, RootDirectory)
                                            .replace('/images/', '/public/images/');
                                        console.log(previousImage);
                                        if (fs.existsSync(previousImage)) {
                                            fs.unlinkSync(previousImage);
                                        }
                                    }
                                    //Success Case
                                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                                    ServiceResult.Description = null;
                                    ServiceResult.Result = true;
                                    ServiceResult.Data = null;
                                    //Delete previoud image


                                    return res.send(ServiceResult);
                                } catch (error) {
                                    ServiceResult.Message = "Failed to parse api response!";
                                    ServiceResult.Description = error.message;
                                    ServiceResult.Result = false;
                                    ServiceResult.Data = null;
                                    if (fs.existsSync(uploadFilePath)) {
                                        fs.unlinkSync(uploadFilePath)
                                    }
                                    return res.send(ServiceResult);
                                }
                            }
                            else {
                                ServiceResult.Message = recordset.recordsets[0][0].Message;
                                ServiceResult.Result = false;
                                ServiceResult.Description = null;
                                ServiceResult.Data = null;
                                if (fs.existsSync(uploadFilePath)) {
                                    fs.unlinkSync(uploadFilePath)
                                }
                                return res.send(ServiceResult);
                            }
                        }
                        else {
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = null;
                            ServiceResult.Data = null;
                            if (fs.existsSync(uploadFilePath)) {
                                fs.unlinkSync(uploadFilePath)
                            }
                            return res.send(ServiceResult);
                        }
                    } catch (e) {
                        ServiceResult.Message = 'API Internal Error!';
                        ServiceResult.Description = null;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        ServiceResult.Description = JSON.stringify(e.message);
                        if (fs.existsSync(uploadFilePath)) {
                            fs.unlinkSync(uploadFilePath)
                        }
                        return res.send(ServiceResult);
                    }
                });
            });
        }

    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;

        if (fs.existsSync(uploadFilePath)) {
            fs.unlinkSync(uploadFilePath)
        }
        return res.send(ServiceResult);
    }
}

const DeleteSubjectsDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.Subject']
        #swagger.description = ''
    */
    //debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_SubjectId = req.query.SubjectId;
        var iUserId = req.query.DeletedBy;

        if ((Number(iPK_SubjectId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_SubjectId)) || isNaN(Number(iUserId)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(SubjectId & DeletedBy) query params must be required a number & grater than zero!';
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

            request.input('iPK_SubjectId', sql.BigInt, iPK_SubjectId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[ACAD].[USP_SvcDeleteSubject]", function (err, recordset) {
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
    GetSubjectDetails,
    AddEditSubjectDetails,
    DeleteSubjectsDetails
}