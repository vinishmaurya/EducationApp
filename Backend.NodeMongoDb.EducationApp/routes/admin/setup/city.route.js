'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/city.controller');
const router = express.Router();


router.get('/admin/City/GetCityDetails', setupController.GetCityDetails);
router.post('/admin/City/AddEditCityDetails', setupController.AddEditCityDetails);
router.delete('/admin/City/DeleteCityDetails', setupController.DeleteCitysDetails);

module.exports = router