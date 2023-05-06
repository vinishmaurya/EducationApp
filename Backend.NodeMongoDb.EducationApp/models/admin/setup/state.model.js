const mongoose = require('mongoose');

const adminMstStateClcts = new mongoose.Schema({
    CountryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstCountry_Clcts"
    },
    StateName: {
        type: String
    },
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    },
    CreatedDateTime: {
        type: Date
    }
})
module.exports = mongoose.model('admin_MstState_Clcts', adminMstStateClcts)