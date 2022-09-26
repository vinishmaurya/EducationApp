const mongoose = require('mongoose');

const operationModelSchema = new mongoose.Schema({
    open: {
        required: false,
        type: String
    },
    close: {
        required: false,
        type: String
    },
    Monday: {
        required: false,
        type: String
    },
    Tuesday: {
        required: false,
        type: String
    },
    Wednesday: {
        required: false,
        type: String
    },
    Thursday: {
        required: false,
        type: String
    },
    Friday: {
        required: false,
        type: String
    },
    Saturday: {
        required: false,
        type: String
    },
    Sunday: {
        required: false,
        type: String
    },
    halfMonday: {
        required: false,
        type: String
    },
    halfTuesday: {
        required: false,
        type: String
    },
    halfWednesday: {
        required: false,
        type: String
    },
    halfThursday: {
        required: false,
        type: String
    },
    halfFriday: {
        required: false,
        type: String
    },
    halfSaturday: {
        required: false,
        type: String
    },
    halfSunday: {
        required: false,
        type: String
    },
    online: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('OperationData', operationModelSchema)