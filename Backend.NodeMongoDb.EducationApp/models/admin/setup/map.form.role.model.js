const mongoose = require('mongoose');

const adminMapFormRoleClcts = new mongoose.Schema({
    FormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstForm_Clcts"
    },
    RoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstRole_Clcts"
    },
    //ParentId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: "admin_MstForm_Clcts"
    //},
    CanAdd: {
        type: Boolean
    },
    CanEdit: {
        type: Boolean
    },
    CanDelete: {
        type: Boolean
    },
    CanView: {
        type: Boolean
    },
    CanExport: {
        type: Boolean
    },
    InsertionMode: {
        type: String
    },
    //FormName: {
    //    type: String
    //},
    MappingFor: {
        type: String
    },
    //LevelId: {
    //    type: Number
    //},
    //SortId: {
    //    type: Number
    //},
    //Default Schema
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    CreatedDateTime: {
        type: Date
    },
    UpdatedDateTime: {
        type: Date
    },
    DeletedDateTime: {
        type: Date
    },
})
module.exports = mongoose.model('admin_MapFormRole_Clcts', adminMapFormRoleClcts)