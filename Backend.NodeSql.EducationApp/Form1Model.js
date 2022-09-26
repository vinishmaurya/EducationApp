const mongoose = require('mongoose');

const Form1DataSchema = new mongoose.Schema({
    dataAwardCategorySelectionId: {
        required: false,
        type: String
    },
    NameApplicant: {
        required: false,
        type: String
    },
    CertificateNumber: {
        required: false,
        type: String
    },
    Email: {
        required: false,
        type: String
    },
    AltEmail: {
        required: false,
        type: String
    },
    Mobile: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('Form1Data', Form1DataSchema)