'use strict';
const config = require('../../../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../../../models/serviceResult.model');
const fs = require('fs-extra');
const date = require('date-and-time');

const GetChapterDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.Chapter']
        #swagger.description = ''
    */
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_ChapterId = req.query.ChapterId;
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
            request.input('iPK_ChapterId', sql.BigInt, iPK_ChapterId);
            request.input('iRowperPage', sql.BigInt, RowperPage);
            request.input('iCurrentPage', sql.BigInt, CurrentPage);
            request.input('cSearchBy', sql.VarChar(500), cSearchBy);
            request.input('cSearchValue', sql.VarChar(500), cSearchValue);
            request.execute("[ACAD].[USP_SvcGetChapterDetails]", function (err, recordset) {
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




const AddEditChapterDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Chapter']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    let message = "", bool = true, ChapterFile_Multipart = null, ChapterVideo_Multipart = null, Body_ChapterDetails = null;
    let uploadedChapterFilePath = null, uploadedChapterVideoPath = null;
    // Define the maximum size for uploading
    // file i.e. 1 MB. it is optional
    const maxSizeFile = 1 * 1000 * 1000;
    // video i.e. 10 MB. it is optional
    const maxSizeVideo = 10 * 1000 * 1000;

    try {
        //debugger;


        if (Object.keys(req.body) != "ChapterDetails") {
            message = "No were data found for Chapter details with form data key ('ChapterDetails')!";
            //res.status(200).json({ Message: "No files were uploaded for Id Type." });
            //return;
            bool = false;
        }
        else {
            Body_ChapterDetails = JSON.parse(req.body.ChapterDetails);
        }
        if (bool) {
            if (!Body_ChapterDetails.ChapterFileUri) {
                var isFile = req.files;
                //if ((!req.files || Object.keys(req.files).length <= 0)) {
                //    message = "No files were uploaded for Chapter file!";
                //    bool = false;
                //}
                if (isFile) {
                    if (!Object.keys(req.files).includes("ChapterFile")) {
                        message = "No files were uploaded for Chapter file with form data key ('ChapterFile')!";
                        //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                        //return;
                        bool = false;
                    }
                    else {
                        ChapterFile_Multipart = req.files.ChapterFile;
                        let fileName = ChapterFile_Multipart.name;
                        let extension = fileName.substr(fileName.lastIndexOf('.'), fileName.length - fileName.lastIndexOf('.')).toUpperCase();
                        //Size and format validations
                        if (["PDF"].includes(extension)) {
                            message = "Invalid Chapter file format? only (pdf) files are required!";
                            bool = false;
                        }
                        else if ((ChapterFile_Multipart.size / (1024 * 1024)) > 10) {
                            message = "Invalid Chapter file size? Only 10MB image are valid!";
                            bool = false;
                        }
                    }
                }
            }
            if (!Body_ChapterDetails.ChapterVideoUri) {
                var isFile = req.files;
                //if ((!req.files || Object.keys(req.files).length <= 0)) {
                //    message = "No files were uploaded for Chapter Video!";
                //    bool = false;
                //}
                //else

                if (isFile) {
                    if (!Object.keys(req.files).includes("ChapterVideo")) {
                        message = "No files were uploaded for Chapter Video with form data key ('ChapterVideo')!";
                        //res.status(200).json({ Message: "No files were uploaded for Id Type." });
                        //return;
                        bool = false;
                    }
                    else {
                        ChapterVideo_Multipart = req.files.ChapterVideo;
                        let fileName = ChapterVideo_Multipart.name;
                        let extension = fileName.substr(fileName.lastIndexOf('.'), fileName.length - fileName.lastIndexOf('.')).toUpperCase();
                        //Size and format validations
                        if (["MP4"].includes(extension)) {
                            message = "Invalid Chapter Video file format? only (mp4) files are required!";
                            bool = false;
                        }
                        else if ((ChapterVideo_Multipart.size / (1024 * 1024)) > 100) {
                            message = "Invalid Chapter Video file size? Only 100MB video file are valid!";
                            bool = false;
                        }
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
            var RootDirectory = require('path').resolve();
            if (ChapterFile_Multipart) {
                RootDirectory = `${RootDirectory}/public/files/app_files/Chapter_File/`
                if (!fs.existsSync(RootDirectory)) {
                    fs.mkdirSync(RootDirectory, { recursive: true });
                }
                let fileName_orignal = ChapterFile_Multipart.name;
                let extension = fileName_orignal.substr(fileName_orignal.lastIndexOf('.'), fileName_orignal.length - fileName_orignal.lastIndexOf('.')).toUpperCase();

                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + extension;
                var uploadedChapterFileUri = `${process.env.HOST_URL}/files/app_files/Chapter_File/` + fileName;
                uploadedChapterFilePath = RootDirectory + fileName;
                fs.writeFile(uploadedChapterFilePath, ChapterFile_Multipart.data, { encoding: 'base64' }, function (err) {
                    ServiceResult.Message = 'Failed while file save!';
                    ServiceResult.Description = err;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                });
            }
            if (ChapterVideo_Multipart) {
                RootDirectory = `${RootDirectory}/public/videos/app_videos/Chapter_Video/`
                if (!fs.existsSync(RootDirectory)) {
                    fs.mkdirSync(RootDirectory, { recursive: true });
                }
                let fileName_orignal = ChapterVideo_Multipart.name;
                let extension = fileName_orignal.substr(fileName_orignal.lastIndexOf('.'), fileName_orignal.length - fileName_orignal.lastIndexOf('.')).toUpperCase();

                var fileName = date.format((new Date()), 'DDMMMYYYYhhmmss') + extension;
                var uploadedChapterVideoUri = `${process.env.HOST_URL}/videos/app_videos/Chapter_Video/` + fileName;
                uploadedChapterVideoPath = RootDirectory + fileName;
                fs.writeFile(uploadedChapterVideoPath, ChapterVideo_Multipart.data, { encoding: 'base64' }, function (err) {
                    ServiceResult.Message = 'Failed while file save!';
                    ServiceResult.Description = err;
                    ServiceResult.Result = false;
                    ServiceResult.Data = null;
                });
            }
            res.setHeader('Content-Type', 'application/json');
            console.log(Body_ChapterDetails);

            var poolPromise = new sql.ConnectionPool(config.sql);
            await poolPromise.connect().then(function (pool) {
                //the pool that is created and should be used
                // create Request object
                var request = new sql.Request(pool);
                //the pool from the promise


                request.input('iPK_ChapterId', sql.BigInt, Body_ChapterDetails.ChapterId);
                request.input('iFK_SubjectId', sql.BigInt, Body_ChapterDetails.SubjectId);
                request.input('cChapterName', sql.NVarChar(200), Body_ChapterDetails.ChapterName);
                request.input('cChapterDescription', sql.NVarChar(500), Body_ChapterDetails.ChapterDescription);
                request.input('cChapterFileUri', sql.NVarChar(500), uploadedChapterFileUri);
                request.input('cChapterVideoUri', sql.NVarChar(500), uploadedChapterVideoUri);
                request.input('cChapterYoutubeVideoLink', sql.NVarChar(500), Body_ChapterDetails.ChapterYoutubeVideoLink);
                request.input('bIsActive', sql.BIT, Body_ChapterDetails.IsActive === "true" ? true : false);
                request.input('iCreatedBy', sql.BigInt, Body_ChapterDetails.CreatedBy);

                request.execute("[ACAD].[USP_SvcAddEditChapter]", function (err, recordset) {
                    try {
                        if (err) {
                            console.log(err);
                            sql.close();
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Description = err.message;
                            ServiceResult.Result = false;
                            ServiceResult.Data = null;
                            if (ChapterFile_Multipart) {
                                if (fs.existsSync(uploadedChapterFilePath)) {
                                    fs.unlinkSync(uploadedChapterFilePath)
                                }
                            }
                            if (ChapterVideo_Multipart) {
                                if (fs.existsSync(uploadedChapterVideoPath)) {
                                    fs.unlinkSync(uploadedChapterVideoPath)
                                }
                            }
                            return res.send(ServiceResult);
                        }
                        sql.close();
                        if (recordset) {
                            if (recordset.recordsets[0][0].Message_Id == 1) {
                                try {
                                    let Data = null;
                                    if (ChapterFile_Multipart && Body_ChapterDetails.ChapterId != 0) {
                                        RootDirectory = require('path').resolve();
                                        let ChapterFileBeforeUpdate = recordset.recordsets[1][0].ChapterFileBeforeUpdate;
                                        let previousfile = (ChapterFileBeforeUpdate)
                                            .replace(process.env.HOST_URL, RootDirectory)
                                            .replace('/images/', '/public/files/');
                                        console.log(previousfile);
                                        if (fs.existsSync(previousfile)) {
                                            fs.unlinkSync(previousfile);
                                        }

                                    }
                                    if (ChapterVideo_Multipart && Body_ChapterDetails.ChapterId != 0) {
                                        let ChapterVideoBeforeUpdate = recordset.recordsets[1][0].ChapterVideoBeforeUpdate;
                                        let previousfile = (ChapterVideoBeforeUpdate)
                                            .replace(process.env.HOST_URL, RootDirectory)
                                            .replace('/images/', '/public/videos/');
                                        console.log(previousfile);
                                        if (fs.existsSync(previousfile)) {
                                            fs.unlinkSync(previousfile);
                                        }
                                    }
                                    
                                    //Success Case
                                    ServiceResult.Message = recordset.recordsets[0][0].Message;
                                    ServiceResult.Description = null;
                                    ServiceResult.Result = true;
                                    ServiceResult.Data = Data;
                                    //Delete previoud image


                                    return res.send(ServiceResult);
                                } catch (error) {
                                    ServiceResult.Message = "Failed to parse api response!";
                                    ServiceResult.Description = error.message;
                                    ServiceResult.Result = false;
                                    ServiceResult.Data = null;
                                    if (ChapterFile_Multipart) {
                                        if (fs.existsSync(uploadedChapterFilePath)) {
                                            fs.unlinkSync(uploadedChapterFilePath)
                                        }
                                    }
                                    if (ChapterVideo_Multipart) {
                                        if (fs.existsSync(uploadedChapterVideoPath)) {
                                            fs.unlinkSync(uploadedChapterVideoPath)
                                        }
                                    }
                                    return res.send(ServiceResult);
                                }
                            }
                            else {
                                ServiceResult.Message = recordset.recordsets[0][0].Message;
                                ServiceResult.Result = false;
                                ServiceResult.Description = null;
                                ServiceResult.Data = null;
                                if (ChapterFile_Multipart) {
                                    if (fs.existsSync(uploadedChapterFilePath)) {
                                        fs.unlinkSync(uploadedChapterFilePath)
                                    }
                                }
                                if (ChapterVideo_Multipart) {
                                    if (fs.existsSync(uploadedChapterVideoPath)) {
                                        fs.unlinkSync(uploadedChapterVideoPath)
                                    }
                                }
                                return res.send(ServiceResult);
                            }
                        }
                        else {
                            ServiceResult.Message = "Failed to parse api response!";
                            ServiceResult.Result = false;
                            ServiceResult.Description = null;
                            ServiceResult.Data = null;
                            if (ChapterFile_Multipart) {
                                if (fs.existsSync(uploadedChapterFilePath)) {
                                    fs.unlinkSync(uploadedChapterFilePath)
                                }
                            }
                            if (ChapterVideo_Multipart) {
                                if (fs.existsSync(uploadedChapterVideoPath)) {
                                    fs.unlinkSync(uploadedChapterVideoPath)
                                }
                            }
                            return res.send(ServiceResult);
                        }
                    } catch (e) {
                        ServiceResult.Message = 'API Internal Error!';
                        ServiceResult.Description = null;
                        ServiceResult.Result = false;
                        ServiceResult.Data = null;
                        ServiceResult.Description = JSON.stringify(e.message);
                        if (ChapterFile_Multipart) {
                            if (fs.existsSync(uploadedChapterFilePath)) {
                                fs.unlinkSync(uploadedChapterFilePath)
                            }
                        }
                        if (ChapterVideo_Multipart) {
                            if (fs.existsSync(uploadedChapterVideoPath)) {
                                fs.unlinkSync(uploadedChapterVideoPath)
                            }
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
        if (ChapterFile_Multipart) {
            if (fs.existsSync(uploadedChapterFilePath)) {
                fs.unlinkSync(uploadedChapterFilePath)
            }
        }
        if (ChapterVideo_Multipart) {
            if (fs.existsSync(uploadedChapterVideoPath)) {
                fs.unlinkSync(uploadedChapterVideoPath)
            }
        }
        return res.send(ServiceResult);
    }
}

const DeleteChaptersDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Academics.Chapter']
        #swagger.description = ''
    */
    //debugger;
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_ChapterId = req.query.ChapterId;
        var iUserId = req.query.DeletedBy;

        if ((Number(iPK_ChapterId) <= 0 || Number(iUserId) <= 0) || (isNaN(Number(iPK_ChapterId)) || isNaN(Number(iUserId)))) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(ChapterId & DeletedBy) query params must be required a number & grater than zero!';
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

            request.input('iPK_ChapterId', sql.BigInt, iPK_ChapterId);
            request.input('iUserId', sql.BigInt, iUserId);

            request.execute("[ACAD].[USP_SvcDeleteChapter]", function (err, recordset) {
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
    GetChapterDetails,
    AddEditChapterDetails,
    DeleteChaptersDetails
}