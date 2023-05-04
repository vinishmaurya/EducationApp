'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/Session.controller');
const router = express.Router();


router.get('/academics/Session/GetSessionDetails', setupController.GetSessionDetails);
router.post('/academics/Session/AddEditSessionDetails', setupController.AddEditSessionDetails);
router.delete('/academics/Session/DeleteSessionsDetails', setupController.DeleteSessionsDetails);

module.exports = router