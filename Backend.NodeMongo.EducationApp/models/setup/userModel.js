const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema(
    {
        "_UserId": {
            "type": "Number"
        },
        "UserName": {
            "type": "String"
        },
        "RoleDetails": {
            "_RoleId": {
                "type": "Number"
            },
            "RoleName": {
                "type": "String"
            },
            "HomePage": {
                "type": "Number"
            },
            "IsActive": {
                "type": "Boolean"
            },
            "IsDeleted": {
                "type": "Boolean"
            }
        },
        "FormAccessDetails": {
            "PK_FormId": {
                "type": "Number"
            },
            "FormName": {
                "type": "String"
            },
            "ParentId": {
                "type": "Number"
            },
            "FK_SolutionId": {
                "type": "Number"
            },
            "RoleName": {
                "type": "String"
            },
            "ControllerName": {
                "type": "String"
            },
            "ActionName": {
                "type": "String"
            },
            "LevelId": {
                "type": "Number"
            },
            "MainId": {
                "type": "Number"
            },
            "SortId": {
                "type": "Number"
            },
            "Image": {
                "type": "String"
            },
            "CanAdd": {
                "type": "Boolean"
            },
            "CanEdit": {
                "type": "Boolean"
            },
            "CanDelete": {
                "type": "Boolean"
            },
            "CanView": {
                "type": "Boolean"
            },
            "CanExport": {
                "type": "Boolean"
            },
            "ClassName": {
                "type": "String"
            },
            "HomePage": {
                "type": "Number"
            },
            "Area": {
                "type": "String"
            }
        },
        "UserPassword": {
            "type": "String"
        },
        "MobileNo": {
            "type": "String"
        },
        "AlternateMobileNo": {
            "type": "String"
        },
        "EmailId": {
            "type": "String"
        },
        "Gender": {
            "type": "String"
        },
        "DateOfBirth": {
            "type": "String"
        },
        "UserAddress": {
            "type": "String"
        },
        "ZipCode": {
            "type": "String"
        },
        "IsActive": {
            "type": "Boolean"
        },
        "CreatedBy": {
            "type": "Number"
        },
        "UpdatedBy": {
            "type": "Number"
        },
        "UpdatedDateTime": {
            "type": "Date"
        },
        "FirstName": {
            "type": "String"
        },
        "FullName": {
            "type": "String"
        },
        "LastWebLogInDatetime": {
            "type": "Date"
        }
    }
);

module.exports = mongoose.model('CredentialData', CredentialSchema)
