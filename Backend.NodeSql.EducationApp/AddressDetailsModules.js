const mongoose = require('mongoose');

const AddressDetailsSchema = new mongoose.Schema({
    City: {
        required: false,
        type: String
    },
    State: {
        required: false,
        type: String
    },
    Address: {
        required: false,
        type: String
    },
    Landmark: {
        required: false,
        type: String
    },
    Code: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('AddressDetails', AddressDetailsSchema)