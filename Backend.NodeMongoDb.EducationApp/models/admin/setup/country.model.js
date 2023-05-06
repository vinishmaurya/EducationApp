const mongoose = require('mongoose');

const adminMstCountryClcts = new mongoose.Schema({
    CountryName: {
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
module.exports = mongoose.model('admin_MstCountry_Clcts', adminMstCountryClcts)