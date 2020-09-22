const router = require('express').Router();

// Import Controllers
const { registerUser } = require('../controllers/auth.controller.js');

//Sign Up Route
router.post('/signup', registerUser);

module.exports = router;