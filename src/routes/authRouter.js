
const express = require('express');

const {auth} = require('../middlewares');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', auth, authController.getProfile);
router.get("/logout", auth, authController.logout);
module.exports = router;