const mongoose = require('mongoose');

const adminLkpFormHeaderListClcts = new mongoose.Schema({
    FormCode: {
        type: String
    },
    _id: {
        type: String
    },
    SrNo: {
        type: String
    },
    FormName: {
        type: String
    },
    ComponentName: {
        type: String
    },
    Area: {
        type: String
    },
    ActionName: {
        type: String
    },
    CreatedDateTime: {
        type: String
    },
    Status: {
        type: String
    },
    Action: {
        type: String
    }
})
module.exports = mongoose.model('admin_LkpFormHeaderList_Clcts', adminLkpFormHeaderListClcts)