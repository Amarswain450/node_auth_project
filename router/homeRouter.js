const express = require('express');
const router = new express.Router();
const homeController = require('../controllers/homeController');
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const guest = require('../middleware/guest');

router.get('/',homeController().index);
router.get('/register',guest,registerController().register);
router.post('/register',registerController().postRegister);

router.get('/login',guest,loginController().login);
router.post('/login', loginController().postLogin);

router.post('/logout', loginController().logout);

module.exports=router;