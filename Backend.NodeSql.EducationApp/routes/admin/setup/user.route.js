'use strict';

const express = require('express');
const userController = require('../../../controllers/admin/setup/user.controller');
const router = express.Router();


router.get('/admin/user/GetUserDetails', userController.GetUserDetails);
router.post('/admin/user/AddEditUserDetails', userController.AddEditUserDetails);
router.delete('/admin/user/DeleteusersDetails', userController.DeleteUsersDetails);
router.post("/AuthenticatedUserInfo", userController.AuthenticatedUserInfo);
router.post("/AuthenticatedUserTokenValidation", userController.AuthenticatedUserTokenValidation);

module.exports = router