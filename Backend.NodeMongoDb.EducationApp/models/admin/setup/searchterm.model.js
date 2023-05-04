const mongoose = require('mongoose');

const adminMstSearchTermsClcts = new mongoose.Schema({
    SearchByValue: {
        type: String
    },
    SearchByText: {
        type: String
    },
    FormCode: {
        type: String
    }
})
module.exports = mongoose.model('admin_MstSearchTerms_Clcts', adminMstSearchTermsClcts)