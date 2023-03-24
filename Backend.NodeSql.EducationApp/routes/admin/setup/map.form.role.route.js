'use strict';

const express = require('express');
const mapFormRoleController = require('../../../controllers/admin/setup/map.form.role.controller');
const router = express.Router();


router.get('/admin/MapFormRole/GetAllFormRoleMappings', mapFormRoleController.GetAllFormRoleMappings);
router.post('/admin/MapFormRole/AddEditFormRoleMappings', mapFormRoleController.AddEditFormRoleMappings);

module.exports = router