const mongoose = require('mongoose');

const adminMapDefaultFormCategoryClcts = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_LkpCategory_Clcts"
    },
    FormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstForm_Clcts"
    },
    IsActive: {
        type: Boolean
    }
})
module.exports = mongoose.model('admin_MapDefaultFormCategory_Clcts', adminMapDefaultFormCategoryClcts)