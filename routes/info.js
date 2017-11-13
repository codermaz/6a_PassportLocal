var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("info" , {title: 'Express', data: "übergebene Daten"});
});

router.get('/data/:id', function (req, res, next) {
    console.log(req.params);
    if (req.params.id == "TW") {
        res.send("ID korrekt");
    }
    else {
        res.send("ID nicht korrekt");
    }
});

router.post('/new/', function (req, res, next) {
    var requestBody = req.body;

    console.log(req.body);
    requestBody.name = "Hans";
    res.send(requestBody);
});

router.put('/', function (req, res, next) {
    res.send("update");
});

router.delete('/:deleteID', function (req, res, next) {
    res.send(req.params.deleteID + " wurde gelöscht");
});


module.exports = router;


