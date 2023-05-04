const mongoose = require('mongoose');

const adminMstUserClcts = new mongoose.Schema({
    //PK_UserId: {
    //  type: Number
    //},
    UserName: {
        type: String
    },
    FK_CategoryId: {
        type: Number
    },
    FK_RoleId: {
        type: Number
    },
    FK_CustomerId: {
        type: Number
    },
    FK_AccountId: {
        type: Number
    },
    UserPassword: {
        type: Date
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
        type: Date
    },
    FK_CountryId: {
        type: Number
    },
    FK_StateId: {
        type: Number
    },
    FK_CityId: {
        type: Number
    },
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    },
    CreatedBy: {
        type: Number
    },
    UpdatedBy: {
        type: Number
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedDateTime: {
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
        type: Date,
        default: Date.now
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
    }
})
module.exports = mongoose.model('admin_MstUser_Clcts', adminMstUserClcts)