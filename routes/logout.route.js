const router = require('express').Router();

router.get('/logout', (req, res) => {
    req.session = null;
    req.logOut();
    res.send('Logout Successful');
})


module.exports = router;