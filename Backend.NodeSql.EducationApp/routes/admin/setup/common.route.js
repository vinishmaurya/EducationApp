'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/common.controller');
const router = express.Router();

router.get('/admin/common/GetAllCategoryList', setupController.GetAllCategoryList);
router.get('/admin/common/GetAllAccountList', setupController.GetAllAccountList);
router.get('/admin/common/GetAllParentFormsList', setupController.GetAllParentFormsList);

module.exports = router