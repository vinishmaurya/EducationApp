const mongoose = require('mongoose');

const adminLkpCategoryClcts = new mongoose.Schema({
    //FormId: {
    //    type: String
    //},
    //FK_SolutionId: {
    //    type: Number
    //},
    CategoryName: {
        type: String
    },
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    }
})
module.exports = mongoose.model('admin_LkpCategory_Clcts', adminLkpCategoryClcts)