'use strict';

const express = require('express');
const authController = require('../../controllers/admin/auth.controller');
const router = express.Router();


router.post("/AuthenticateUser", authController.AuthenticateUser);

module.exports = router