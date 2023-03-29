'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/common.controller');
const router = express.Router();

router.get('/academics/common/GetAllCountryList', setupController.GetAllCountryList);
router.get('/academics/common/GetAllStateListCountryId', setupController.GetAllStateListCountryId);
router.get('/academics/common/GetAllCityListByState', setupController.GetAllCityListByState);

module.exports = router