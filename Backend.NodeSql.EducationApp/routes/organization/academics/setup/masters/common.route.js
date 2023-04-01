'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/common.controller');
const router = express.Router();

router.get('/academics/common/GetAllCountryList', setupController.GetAllCountryList);
router.get('/academics/common/GetAllStateListCountryId', setupController.GetAllStateListCountryId);
router.get('/academics/common/GetAllCityListByState', setupController.GetAllCityListByState);
router.get('/academics/common/GetAllMediumList', setupController.GetAllMediumList);
router.get('/academics/common/GetAllSectionList', setupController.GetAllSectionList);
router.get('/academics/common/GetAllSessionList', setupController.GetAllSessionList);
router.get('/academics/common/GetAllStudentCategoryList', setupController.GetAllStudentCategoryList);
module.exports = router