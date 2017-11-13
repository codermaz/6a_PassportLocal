/**
 * Created by tami on 26.07.17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;