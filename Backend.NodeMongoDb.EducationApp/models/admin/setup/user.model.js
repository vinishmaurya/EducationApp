const mongoose = require('mongoose');

const adminMstUserClcts = new mongoose.Schema({
    //PK_UserId: {
    //  type: Number
    //},
    UserName: {
        type: String
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_LkpCategory_Clcts"
    },
    RoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstRole_Clcts"
    },
    //FK_CustomerId: {
    //    type: Number
    //},
    AccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstAccount_Clcts"
    },
    UserPassword: {
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
    Gender: {
        type: String
    },
    DateOfBirth: {
        type: String
    },
    UserAddress: {
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
    FullName: {
        type: String
    },
    ShareBy: {
        type: String
    },
    AppRegId: {
        type: String
    },
    IMEINo: {
        type: String
    },
    OSType: {
        type: String
    },
    LastLoginDt: {
        type: Date
    },
    IsVehicleSpecific: {
        type: Boolean
    },
    LastWebLogInDatetime: {
        type: Date
    },
    RefreshToken: {
        type: String
    },
    AccessToken: {
        type: String
    },
    ExpiryDatetime: {
        type: String
    },
    TokenGeneratedDatetime: {
        type: String
    },
    RefreshTokenExpiryDatetime: {
        type: String
    },
    LastAPITokenFetchDatetime: {
        type: Date
    },
    StepCompleted: {
        type: String
    },
    NextStep: {
        type: String
    },
    UserLogo: {
        type: String
    }
})
module.exports = mongoose.model('admin_MstUser_Clcts', adminMstUserClcts)