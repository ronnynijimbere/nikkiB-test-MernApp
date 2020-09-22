const router = require('express').Router();

//Controllers import
const { authCheck } = require('../controllers/auth.controller.js');
const user = require('../controllers/user.controller.js')

//Endpoints
router.get('/dashboard', authCheck, user.findUser);
router.put('/dashboard/update', user.updateTaskLists);

module.exports = router;