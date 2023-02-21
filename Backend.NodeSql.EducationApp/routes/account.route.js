'use strict';

const express = require('express');
const accountController = require('../controllers/account.controller');
const router = express.Router();


router.post("/AuthenticateUser", accountController.AuthenticateUser);
router.post("/AuthenticatedUserInfo",accountController.AuthenticatedUserInfo);

module.exports = router