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
    },
    IsDefaultSelection: {
        type: Boolean
    }
})
module.exports = mongoose.model('admin_MstSearchTerms_Clcts', adminMstSearchTermsClcts)