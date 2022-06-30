// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require ('path');
const usersController = require('../controllers/userController');
const validationLogin = require('../middlewares/validationLogin')

router.get('/login', usersController.login); 
router.post('/login', validationLogin, usersController.loginProcess)


module.exports = router;
