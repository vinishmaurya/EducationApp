'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/Chapter.controller');
const router = express.Router();


router.get('/academics/Chapter/GetChapterDetails', setupController.GetChapterDetails);
router.post('/academics/Chapter/AddEditChapterDetails', setupController.AddEditChapterDetails);
router.delete('/academics/Chapter/DeleteChaptersDetails', setupController.DeleteChaptersDetails);

module.exports = router