'use strict';

const express = require('express');
const setupController = require('../../../controllers/admin/setup/state.controller');
const router = express.Router();


router.get('/admin/State/GetStateDetails', setupController.GetStateDetails);
router.post('/admin/State/AddEditStateDetails', setupController.AddEditStateDetails);
router.delete('/admin/State/DeleteStatesDetails', setupController.DeleteStatesDetails);

module.exports = router