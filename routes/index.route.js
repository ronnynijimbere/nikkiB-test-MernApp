const router = require('express').Router();

router.get('/index', (req, res) => {
    res.send('Please login.')
})

module.exports = router;