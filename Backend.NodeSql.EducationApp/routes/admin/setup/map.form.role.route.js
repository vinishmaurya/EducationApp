'use strict';

const express = require('express');
const mapFormRoleController = require('../../../controllers/admin/setup/map.form.role.controller');
const router = express.Router();


router.get('/admin/MapFormRole/GetSubMenuDetails/:PK_RoleId/:PK_FormId/:MappingFor', mapFormRoleController.GetSubMenuDetails);
router.post('/admin/MapFormRole/AddEditMapFormRoleDetails', mapFormRoleController.AddEditMapFormRoleDetails);

module.exports = router