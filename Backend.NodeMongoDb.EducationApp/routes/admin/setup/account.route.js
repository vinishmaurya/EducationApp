'use strict';

const express = require('express');
const AccountController = require('../../../controllers/admin/setup/account.controller');
const router = express.Router();


router.get('/admin/Account/GetAccountDetails', AccountController.GetAccountDetails);
router.post('/admin/Account/AddEditAccountDetails', AccountController.AddEditAccountDetails);
router.delete('/admin/Account/DeleteAccountsDetails', AccountController.DeleteAccountsDetails);

module.exports = router