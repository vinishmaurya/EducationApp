const mongoose = require('mongoose');

const adminMstTokenFamilyClcts = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    IPAddress: {
        type: String
    },
    RefreshToken: {
        type: String
    },
    RefreshTokenGenerateDateTime: {
        type: Date
    },
    AccessToken: {
        type: String
    },
    ExpiryDatetime: {
        type: Date
    },
    TokenGeneratedDatetime: {
        type: Date
    },
    RefreshTokenExpiryDatetime: {
        type: Date
    },
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    },
    UserName: {
        type: String
    },
    //PK_UserTokenFamilyId: {
    //    type: Number
    //}
    CreatedDatetime: {
        type: Date
    }
})
module.exports = mongoose.model('admin_MstTokenFamily_Clcts', adminMstTokenFamilyClcts)