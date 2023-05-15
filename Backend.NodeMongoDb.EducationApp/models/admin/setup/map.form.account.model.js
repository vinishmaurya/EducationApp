const mongoose = require('mongoose');

const adminMapFormAccountClcts = new mongoose.Schema({
    FormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstForm_Clcts"
    },
    AccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstAccount_Clcts"
    },
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
        type:String
    },
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
module.exports = mongoose.model('admin_MapFormAccount_Clcts', adminMapFormAccountClcts)