'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/medium.controller');
const router = express.Router();


router.get('/academics/Medium/GetMediumDetails', setupController.GetMediumDetails);
router.post('/academics/Medium/AddEditMediumDetails', setupController.AddEditMediumDetails);
router.delete('/academics/Medium/DeleteMediumsDetails', setupController.DeleteMediumsDetails);

module.exports = router