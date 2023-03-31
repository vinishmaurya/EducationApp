'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/Section.controller');
const router = express.Router();


router.get('/academics/Section/GetSectionDetails', setupController.GetSectionDetails);
router.post('/academics/Section/AddEditSectionDetails', setupController.AddEditSectionDetails);
router.delete('/academics/Section/DeleteSectionsDetails', setupController.DeleteSectionsDetails);

module.exports = router