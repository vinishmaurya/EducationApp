'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/country.controller');
const router = express.Router();


router.get('/admin/Country/GetCountryDetails', setupController.GetCountryDetails);
router.post('/admin/Country/AddEditCountryDetails', setupController.AddEditCountryDetails);
router.delete('/admin/Country/DeleteCountrysDetails', setupController.DeleteCountrysDetails);

module.exports = router