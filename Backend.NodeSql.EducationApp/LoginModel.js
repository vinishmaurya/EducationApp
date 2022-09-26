const mongoose = require('mongoose');

const LoginDataSchema = new mongoose.Schema({
    Email: {
        required: false,
        type: String
    },
    Password: {
        required: false,
        type: String
    }
    
})

module.exports = mongoose.model('LoginDataSchema', LoginDataSchema)