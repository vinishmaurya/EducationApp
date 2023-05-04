'use strict';

const express = require('express');
const mapFormAccountController = require('../../../controllers/admin/setup/map.form.account.controller');
const router = express.Router();


router.get('/admin/MapFormAccount/GetAllFormAccountMappings', mapFormAccountController.GetAllFormAccountMappings);
router.post('/admin/MapFormAccount/AddEditFormAccountMappings', mapFormAccountController.AddEditFormAccountMappings);

module.exports = router