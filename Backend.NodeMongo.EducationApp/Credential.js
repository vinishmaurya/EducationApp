const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
    Email: {
        required: false,
        type: String
    },
    Password: {
        required: false,
        type: String
    },
    RePassword: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('CredentialData', CredentialSchema)