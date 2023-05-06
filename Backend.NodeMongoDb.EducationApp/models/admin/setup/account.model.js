const mongoose = require('mongoose');

const adminMstAccountClcts = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_LkpForm_Clcts"
    },
    AccountName: {
        type: String
    },
    ParentAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstAccount_Clcts"
    },
    ContactPerson: {
        type: String
    },
    MobileNo: {
        type: String
    },
    AlternateMobileNo: {
        type: String
    },
    EmailId: {
        type: String
    },
    AlternateEmailId: {
        type: String
    },
    CreatedBy: {
        type: Date
    },
    StepCompleted: {
        type: String
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
})
module.exports = mongoose.model('admin_MstAccount_Clcts', adminMstAccountClcts)