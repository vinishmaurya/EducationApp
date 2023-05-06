'use strict';
const config = require('../../../config');
const sql = require('mssql');
const ServiceResult = require('../../../models/serviceResult.model');
const adminMstUserClcts = require('../../../models/admin/setup/user.model');
const adminMstFormClcts = require('../../../models/admin/setup/form.model');
const adminMstAccountClcts = require('../../../models/admin/setup/account.model');
const adminLkpCategoryClcts = require('../../../models/admin/setup/category.model');
const adminMstSearchTermsClcts = require('../../../models/admin/setup/searchterm.model');
const adminMstRoleClcts = require('../../../models/admin/setup/Role.model');
const adminLkpFormHeaderListClcts = require('../../../models/admin/setup/formHeaderList.model');
var validator = require('validator');
// Network interfaces
//var ifaces = require('os').networkInterfaces();


const GetRoleDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');
        var iPK_RoleId = req.query.RoleId;
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
        if (iPK_RoleId) {
            if (!validator.isMongoId(iPK_RoleId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(RoleId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        var DataList = null;
        if (cSearchBy && cSearchValue) {
            if (cSearchBy == 'RoleName') {
                DataList = await adminMstRoleClcts.find(
                    {
                        $and: [
                            { RoleName: { $regex: cSearchValue, $options: 'i' } },
                            { IsActive: true },
                            { IsDeleted: false },
                        ],
                    }
                )
                    .populate('CategoryId', { "CategoryName": 1, "_id": 1 })
                    .populate('AccountId', { "AccountName": 1, "_id": 1 })
                    .populate('LandingPage', { "FormName": 1, "_id": 1 })
                    .sort({ CreatedDateTime: -1 })
                    .skip(RowperPage * (CurrentPage - 1))
                    .limit(RowperPage);
            }
            else if (cSearchBy == 'AccountName') {
                DataList = await adminMstRoleClcts.find(
                    {
                        $and: [
                            { AccountName: { $regex: cSearchValue, $options: 'i' } },
                            { IsActive: true },
                            { IsDeleted: false },
                        ],
                    }
                )
                    .populate('CategoryId', { "CategoryName": 1, "_id": 1 })
                    .populate('AccountId', { "AccountName": 1, "_id": 1 })
                    .populate('LandingPage', { "FormName": 1, "_id": 1 })
                    .sort({ CreatedDateTime: -1 })
                    .skip(RowperPage * (CurrentPage - 1))
                    .limit(RowperPage);
            }
            else if (cSearchBy == 'FormName') {
                DataList = await adminMstRoleClcts.find(
                    {
                        $and: [
                            { FormName: { $regex: cSearchValue, $options: 'i' } },
                            { IsActive: true },
                            { IsDeleted: false },
                        ],
                    }
                )
                    .populate('CategoryId', { "CategoryName": 1, "_id": 1 })
                    .populate('AccountId', { "AccountName": 1, "_id": 1 })
                    .populate('LandingPage', { "FormName": 1, "_id": 1 })
                    .sort({ CreatedDateTime: -1 })
                    .skip(RowperPage * (CurrentPage - 1))
                    .limit(RowperPage);
            }
        }
        else {
            DataList = await adminMstRoleClcts
                .find(
                    { IsActive: true },
                    { IsDeleted: false },
                )
                .populate('CategoryId', { "CategoryName": 1, "_id": 1 })
                .populate('AccountId', { "AccountName": 1, "_id": 1 })
                .populate('LandingPage', { "FormName": 1, "_id": 1 })
                .sort({ CreatedDateTime: -1 })
                .skip(RowperPage * (CurrentPage - 1))
                .limit(RowperPage);
        }
        var TotalItem = DataList.length;
        var TotalCurrentMonth = await adminMstRoleClcts.find({
            CreatedDateTime: {
                "$gte": (new Date()).setHours(0, 0, 0, 0),
                "$lt": (new Date()).setHours(23, 59, 59, 999),
            }
        }).count();
        var TotalActive = await adminMstRoleClcts.find({ "IsActive": true }).count();
        var TotalInActive = await adminMstRoleClcts.find({ "IsActive": false }).count();
        var CountArray = {
            TotalItem: TotalItem,
            TotalCurrentMonth: TotalCurrentMonth,
            TotalActive: TotalActive,
            TotalInActive: TotalInActive
        };
        var HeaderList = await adminLkpFormHeaderListClcts.findOne({ "FormCode": "ROLE_MASTER" }, { "_id": 0 });

        var SearchTermList = await adminMstSearchTermsClcts.find({ "FormCode": "ROLE_MASTER" });
        ServiceResult.Message = "Success!";
        ServiceResult.Description = null;
        ServiceResult.Result = true;
        ServiceResult.Data = {
            DataList: DataList,
            CountArray: CountArray,
            HeaderList: HeaderList,
            SearchTermList: SearchTermList,
        };
        return res.send(ServiceResult);

        //#region SQL DB
        //if ((Number(RowperPage) <= 0 || Number(CurrentPage) <= 0) || (isNaN(Number(RowperPage)) || isNaN(Number(CurrentPage)))) {
        //    ServiceResult.Message = "Validation Error!";
        //    ServiceResult.Description = '(RowPerPage & CurrentPage) query params must be required a number & grater than zero!';
        //    ServiceResult.Result = false;
        //    ServiceResult.Data = null;
        //    return res.send(ServiceResult);
        //}
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise
        //    request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
        //    request.input('iRowperPage', sql.BigInt, RowperPage);
        //    request.input('iCurrentPage', sql.BigInt, CurrentPage);
        //    request.input('cSearchBy', sql.VarChar(500), cSearchBy);
        //    request.input('cSearchValue', sql.VarChar(500), cSearchValue);
        //    request.execute("[dbo].[USP_SvcGetRoleDetails]", function (err, recordset) {
        //        if (err) {
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err.message;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //        sql.close();

        //        if (recordset) {
        //            if (recordset.recordsets[0][0].Message_Id == 1) {
        //                try {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = {
        //                        DataList: recordset.recordsets[1],
        //                        CountArray: recordset.recordsets[2][0],
        //                        HeaderList: recordset.recordsets[3][0],
        //                        SearchTermList: recordset.recordsets[4],
        //                    };
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    ServiceResult.Message = "Failed to parse api response!";
        //                    ServiceResult.Description = error.message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        }
        //        else {
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
        //#endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}

const AddEditRoleDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_RoleId = req.body.RoleId;
        var cRoleName = req.body.RoleName;
        var FK_CategoryId = req.body.CategoryId;
        var FK_AccountId = req.body.AccountId;
        var iHomePage = req.body.LandingPage;
        var IsActive = req.body.IsActive;
        var CreatedBy = req.body.CreatedBy;

        if (iPK_RoleId) {
            if (!validator.isMongoId(iPK_RoleId)) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Description = '(RoleId) query params must be a valid mongo id!';
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }

        if (!cRoleName || !FK_CategoryId || !FK_AccountId || !iHomePage || !CreatedBy) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RoleName, CategoryId, AccountId, LandingPage, CreatedBy) parameters must be required!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }

        if (!validator.isMongoId(CreatedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CreatedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(FK_CategoryId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(CategoryId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(FK_AccountId)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(AccountId) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iHomePage)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(HomePage) form id query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (iPK_RoleId) {
            var objUpdate = await adminMstRoleClcts.findById(iPK_RoleId);
            if (!objUpdate) {
                ServiceResult.Message = "Validation Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = "Invalid ID ? Role ID does not exists!";
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            }
        }
        var CreatedByUser = CreatedBy ? await adminMstUserClcts.findById(CreatedBy) : "";
        var CategoryIdInfo = FK_CategoryId ? await adminLkpCategoryClcts.findById(FK_CategoryId) : "";
        var AccountIdInfo = FK_AccountId ? await adminMstAccountClcts.findById(FK_AccountId) : "";
        var HomePageInfo = iHomePage ? await adminMstFormClcts.findById(iHomePage) : "";
        res.setHeader('Content-Type', 'application/json');

        if (iPK_RoleId == "") {
            const objAdminMstRoleClcts = new adminMstRoleClcts({
                RoleName: cRoleName,
                CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                AccountId: AccountIdInfo ? AccountIdInfo._id : null,
                LandingPage: HomePageInfo ? HomePageInfo._id : null,
                IsActive: IsActive,
                CreatedBy: CreatedByUser ? CreatedByUser._id : null,
                CreatedDateTime: (new Date()),
            });
            await objAdminMstRoleClcts.save()
                .then(item => {
                    ServiceResult.Message = "New Role details inserted successfully!";
                    ServiceResult.Result = true;
                    ServiceResult.Description = null;
                    ServiceResult.Data = item;
                    return res.send(ServiceResult);
                })
                .catch(err => {
                    ServiceResult.Message = "API Internal Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = err.message;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                });
        }
        else {
            await adminMstRoleClcts.findByIdAndUpdate(
                iPK_RoleId,
                {
                    RoleName: cRoleName,
                    CategoryId: CategoryIdInfo ? CategoryIdInfo._id : null,
                    AccountId: AccountIdInfo ? AccountIdInfo._id : null,
                    LandingPage: iHomePage,
                    UpdatedBy: CreatedByUser ? CreatedByUser._id : null,
                    UpdatedDateTime: (new Date()),
                },
                { new: true, useFindAndModify: false }
            )
                .then(item => {
                    ServiceResult.Message = "Role details updated successfully!";
                    ServiceResult.Result = true;
                    ServiceResult.Description = null;
                    ServiceResult.Data = item;
                    return res.send(ServiceResult);
                })
                .catch(err => {
                    ServiceResult.Message = "API Internal Error!";
                    ServiceResult.Result = false;
                    ServiceResult.Description = err.message;
                    ServiceResult.Data = null;
                    return res.send(ServiceResult);
                });
        }

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
        //    request.input('cRoleName', sql.NVarChar(100), cRoleName);
        //    request.input('iFK_CategoryId', sql.NVarChar(100), FK_CategoryId);
        //    request.input('iFK_AccountId', sql.NVarChar(100), FK_AccountId);
        //    request.input('iHomePage', sql.BigInt, iHomePage);
        //    request.input('bIsActive', sql.Bit, IsActive);
        //    request.input('iUserId', sql.BigInt, CreatedBy);
        //    request.execute("[dbo].[USP_SvcAddEditRole]", function (err, recordset) {
        //        try {
        //            if (err) {
        //                console.log(err);
        //                sql.close();
        //                ServiceResult.Message = "Failed to parse api response!";
        //                ServiceResult.Description = err.message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //            sql.close();
        //            if (recordset) {
        //                if (recordset.recordsets[0][0].Message_Id == 1) {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Data = recordset.recordsets[1][0];
        //                    return res.send(ServiceResult);
        //                }
        //                else {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = "Failed to parse api response!";
        //                ServiceResult.Result = false;
        //                ServiceResult.Description = null;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        } catch (e) {
        //            ServiceResult.Message = 'API Internal Error!';
        //            ServiceResult.Description = null;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            ServiceResult.Description = JSON.stringify(e.message);
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
        //#endregion
    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}


const DeleteRolesDetails = async (req, res, next) => {
    /*  #swagger.tags = ['Admin.Role']
        #swagger.description = ''
    */
    ServiceResult.Message = null;
    ServiceResult.Description = null;
    ServiceResult.Result = null;
    ServiceResult.Data = null;
    try {
        res.setHeader('Content-Type', 'application/json');

        var iPK_RoleId = req.query.RoleId;
        var DeletedBy = req.query.DeletedBy;

        if (!iPK_RoleId || !DeletedBy) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RoleId & DeletedBy) query params must be required a number!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        if (!validator.isMongoId(iPK_RoleId) || !validator.isMongoId(DeletedBy)) {
            ServiceResult.Message = "Validation Error!";
            ServiceResult.Description = '(RoleId & DeletedBy) query params must be a valid mongo id!';
            ServiceResult.Result = false;
            ServiceResult.Data = null;
            return res.send(ServiceResult);
        }
        var DeletedByUser = DeletedBy ? await adminMstUserClcts.findById(DeletedBy) : "";
        await adminMstRoleClcts.findByIdAndUpdate(
            iPK_RoleId,
            {
                IsActive: false,
                IsDeleted: true,
                DeletedBy: DeletedByUser ? DeletedByUser._id : null,
                DeletedDateTime: (new Date())
            },
            { new: true, useFindAndModify: false }
        )
            .then(item => {
                ServiceResult.Message = "Role details deleted successfully!";
                ServiceResult.Result = true;
                ServiceResult.Description = null;
                ServiceResult.Data = item;
                return res.send(ServiceResult);
            })
            .catch(err => {
                ServiceResult.Message = "API Internal Error!";
                ServiceResult.Result = false;
                ServiceResult.Description = err.message;
                ServiceResult.Data = null;
                return res.send(ServiceResult);
            });

        //#region SQL DB
        //var poolPromise = new sql.ConnectionPool(config.sql);
        //await poolPromise.connect().then(function (pool) {
        //    //the pool that is created and should be used
        //    // create Request object
        //    var request = new sql.Request(pool);
        //    //the pool from the promise

        //    request.input('iPK_RoleId', sql.BigInt, iPK_RoleId);
        //    request.input('iUserId', sql.BigInt, DeletedBy);

        //    request.execute("[dbo].[USP_SvcDeleteRole]", function (err, recordset) {
        //        if (err) {
        //            sql.close();
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Description = err.message;
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //        sql.close();
        //        if (recordset) {
        //            if (recordset.recordsets[0][0].Message_Id == 1) {
        //                try {
        //                    ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                    ServiceResult.Description = null;
        //                    ServiceResult.Result = true;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                } catch (error) {
        //                    ServiceResult.Message = "Failed to parse api response!";
        //                    ServiceResult.Description = error.message;
        //                    ServiceResult.Result = false;
        //                    ServiceResult.Data = null;
        //                    return res.send(ServiceResult);
        //                }
        //            }
        //            else {
        //                ServiceResult.Message = recordset.recordsets[0][0].Message;
        //                ServiceResult.Result = false;
        //                ServiceResult.Data = null;
        //                return res.send(ServiceResult);
        //            }
        //        }
        //        else {
        //            ServiceResult.Message = "Failed to parse api response!";
        //            ServiceResult.Result = false;
        //            ServiceResult.Data = null;
        //            return res.send(ServiceResult);
        //        }
        //    });
        //});
        //#endregion

    } catch (error) {
        ServiceResult.Message = "API Internal Error!";
        ServiceResult.Result = false;
        ServiceResult.Description = error.message;
        ServiceResult.Data = null;
        return res.send(ServiceResult);
    }
}
module.exports = {
    GetRoleDetails,
    AddEditRoleDetails,
    DeleteRolesDetails
}