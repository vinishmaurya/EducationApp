'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/common.controller');
const router = express.Router();

router.get('/admin/common/GetAllCategoryList', setupController.GetAllCategoryList);
router.get('/admin/common/GetAllAccountList', setupController.GetAllAccountList);
router.get('/admin/common/GetAllParentFormsList', setupController.GetAllParentFormsList);
router.get('/admin/common/GetAllCountryList', setupController.GetAllCountryList);
router.get('/admin/common/GetAllStateListCountryId', setupController.GetAllStateListCountryId);
router.get('/admin/common/GetAllCityListByState', setupController.GetAllCityListByState);
router.get('/admin/common/GetAllParentAccountList', setupController.GetAllParentAccountList);
router.get('/admin/common/GetAllRoleList', setupController.GetAllRoleList);


module.exports = router