'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/chapterTopics.controller');
const router = express.Router();


router.get('/academics/ChapterTopics/GetChapterTopicsDetails', setupController.GetChapterTopicsDetails);
router.post('/academics/ChapterTopics/AddEditChapterTopicsDetails', setupController.AddEditChapterTopicsDetails);
router.delete('/academics/ChapterTopics/DeleteChapterTopicssDetails', setupController.DeleteChapterTopicssDetails);

module.exports = router