const mongoose = require('mongoose');

const adminMstCityClcts = new mongoose.Schema({
    CountryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstCountry_Clcts"
    },
    StateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstState_Clcts"
    },
    CityName: {
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
module.exports = mongoose.model('admin_MstCity_Clcts', adminMstCityClcts)