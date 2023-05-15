const mongoose = require('mongoose');

const adminMstAccountClcts = new mongoose.Schema({
    AccountName: {
        type: String
    },
    AccountLogo: {
        type: String
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_LkpCategory_Clcts"
    },
    ParentAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstAccount_Clcts"
    },
    AccountAddress: {
        type: String
    },
    ZipCode: {
        type: String
    },
    CountryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstCountry_Clcts"
    },
    StateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstState_Clcts"
    },
    CityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstCity_Clcts"
    },
    BillingAddress: {
        type: String
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
    NextStep: {
        type: String
    },
    StepCompleted: {
        type: String
    },
    DefaultUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    IsActive: {
        type: Boolean,
        //alias: "Status"
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