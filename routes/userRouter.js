const express = require('express');
const authController = require('../controllers/authContoller');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);

router.route('/');
router.route('/:id');

module.exports = router;
