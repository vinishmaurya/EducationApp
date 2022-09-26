const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema(
    {
        FormName: {
            type: String
        },
        ParentId: {
            type: String
        },
        RoleName: {
            type: String
        },
        ScreenName: {
            type: String
        },
        LevelId: {
            type: Number
        },
        MainId: {
            type: Number
        },
        SortId: {
            type: Number
        },
        CanAdd: {
            type: Boolean
        },
        CanEdit: {
            type: Boolean
        },
        CanDelete: {
            type: Boolean
        },
        CanView: {
            type: Boolean
        },
        CanExport: {
            type: Boolean
        },
        ClassName: {
            type: String
        },
        HomePage: {
            type: Number
        }
    }
);

module.exports = mongoose.model('FormSchema', FormSchema)
