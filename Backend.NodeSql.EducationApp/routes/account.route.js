'use strict';

const express = require('express');
const accountController = require('../controllers/account.controller');
const router = express.Router();


router.post("/AuthenticateUser", accountController.AuthenticateUser);

module.exports = router