'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/Class.controller');
const router = express.Router();


router.get('/academics/Class/GetClassDetails', setupController.GetClassDetails);
router.post('/academics/Class/AddEditClassDetails', setupController.AddEditClassDetails);
router.delete('/academics/Class/DeleteClassDetails', setupController.DeleteClassDetails);

module.exports = router