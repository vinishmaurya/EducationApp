'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/Subject.controller');
const router = express.Router();


router.get('/academics/Subject/GetSubjectDetails', setupController.GetSubjectDetails);
router.post('/academics/Subject/AddEditSubjectDetails', setupController.AddEditSubjectDetails);
router.delete('/academics/Subject/DeleteSubjectsDetails', setupController.DeleteSubjectsDetails);

module.exports = router