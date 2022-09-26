const mongoose = require('mongoose');
const AwardCategoryModel = new mongoose.Schema({
    name: {
        require: true,
        type: String
    }
});
module.exports = mongoose.model('AwardCategoryModel', AwardCategoryModel);