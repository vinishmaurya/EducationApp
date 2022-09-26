'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/form.controller');
const router = express.Router();


router.get('/admin/form/GetFormDetails/:PK_FormId/:RowperPage/:CurrentPage/:SearchBy/:SearchValue', setupController.GetFormDetails);
router.post('/admin/form/AddEditFormDetails', setupController.AddEditFormDetails);
router.delete('/admin/form/DeleteFormsDetails', setupController.DeleteFormsDetails);
router.get('/admin/form/GetParentFormsList', setupController.GetParentFormsList);

module.exports = router