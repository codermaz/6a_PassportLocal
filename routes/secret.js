var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('secret', {title: 'top secret'});
    }
    else {
        res.render('login');
    }
});

module.exports = router;
