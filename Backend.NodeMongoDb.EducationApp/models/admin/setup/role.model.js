const mongoose = require('mongoose');

const adminMstRoleClcts = new mongoose.Schema({
    //PK_RoleId: {
    //    type: Number
    //},
    RoleName: {
        type: String
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_LkpCategory_Clcts"
    },
    AccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstAccount_Clcts"
    },
    HomePage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstForm_Clcts"
    },
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
    DeletedDateTime: {
        type: Date
    },
    UpdatedDateTime: {
        type: Date
    },
    CreatedDateTime: {
        type: Date
    },
    //FK_CustomerId: {
    //    type: Number
    //}
})
module.exports = mongoose.model('admin_MstRole_Clcts', adminMstRoleClcts)