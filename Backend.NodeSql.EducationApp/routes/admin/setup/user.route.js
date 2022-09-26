'use strict';

const express = require('express');
const userController = require('../../../controllers/admin/setup/user.controller');
const router = express.Router();


router.get('/admin/user/GetUserDetails/:PK_UserId/:RowperPage/:CurrentPage/:SearchBy/:SearchValue', userController.GetUserDetails);
router.post('/admin/user/AddEditUserDetails', userController.AddEditUserDetails);
router.delete('/admin/user/DeleteusersDetails', userController.DeleteUsersDetails);

module.exports = router