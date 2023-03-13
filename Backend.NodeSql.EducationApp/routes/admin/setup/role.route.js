'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/role.controller');
const router = express.Router();


router.get('/admin/Role/GetRoleDetails', setupController.GetRoleDetails);
router.post('/admin/Role/AddEditRoleDetails', setupController.AddEditRoleDetails);
router.delete('/admin/Role/DeleteRolesDetails', setupController.DeleteRolesDetails);
router.get('/admin/Role/GetRolesList', setupController.GetRolesList);

module.exports = router