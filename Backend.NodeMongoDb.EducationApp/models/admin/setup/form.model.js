const mongoose = require('mongoose');

const adminMstFormClcts = new mongoose.Schema({
    //FormId: {
    //    type: String
    //},
    //FK_SolutionId: {
    //    type: Number
    //},
    FormName: {
        type: String
    },
    ComponentName: {
        type: String
    },
    LandingComponentName: {
        type: String
    },
    ParentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstForm_Clcts"
    },
    //FK_MainId: {
    //    type: Number
    //},
    LevelId: {
        type: Number
    },
    SortId: {
        type: Number
    },
    IsActive: {
        type: Boolean
    },
    IsDeleted: {
        type: Boolean
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin_MstUser_Clcts"
    },
    CreatedDateTime: {
        type: Date
    },
    UpdatedDateTime: {
        type: Date
    },
    DeletedDateTime: {
        type: Date
    },
    ClassName: {
        type: String
    },
    Area: {
        type: String
    },
    PlatFormType: {
        type: String
    },
    SPA_ComponentHref: {
        type: String
    }
})
module.exports = mongoose.model('admin_MstForm_Clcts', adminMstFormClcts)