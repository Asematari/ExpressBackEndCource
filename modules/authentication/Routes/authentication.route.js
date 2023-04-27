const express = require('express');
const router = express.Router();
const {validLogin} = require('../Validation/validation.auth')
const {loginController} = require('../Controller/controllerlogin')
//ملف
router.post('/login', validLogin, loginController )

 module.exports = router;