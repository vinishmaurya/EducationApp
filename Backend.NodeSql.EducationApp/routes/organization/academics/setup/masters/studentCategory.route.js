'use strict';

const express = require('express');
const setupController = require('../../../../../controllers/organization/academics/setup/masters/StudentCategory.controller');
const router = express.Router();


router.get('/academics/StudentCategory/GetStudentCategoryDetails', setupController.GetStudentCategoryDetails);
router.post('/academics/StudentCategory/AddEditStudentCategoryDetails', setupController.AddEditStudentCategoryDetails);
router.delete('/academics/StudentCategory/DeleteStudentCategorysDetails', setupController.DeleteStudentCategorysDetails);

module.exports = router