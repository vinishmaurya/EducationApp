const mongoose = require('mongoose');

const documentuploadModelSchema = new mongoose.Schema({
    idproofname: {
        required: false,
        type: String
    },
    idproof: {
        required: false,
        type: String
    },
    profile: {
        required: false,
        type: String
    },
    
})

module.exports = mongoose.model('documentupload', documentuploadModelSchema)