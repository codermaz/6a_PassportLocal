// var jsdom = require('jsdom').jsdom;
// var document = jsdom('<html></html>', {});
// var window = document.defaultView;
// var $ = require('jquery')(window);

// var jsdom = require('jsdom');
// const {JSDOM} = jsdom;
// const {document} = (new JSDOM('')).window;
// global.document = document;

let express = require('express');
let router = express.Router();
let connection = require('./database/sqlConfig');

// Get Register Page
router.get('/', function (req, res, next) {
    res.render("register");
});

router.post('/', function (req, res, next) {
    let sqlGetAll = "SELECT * FROM userstable WHERE username=?";
    //  sqlInsertUser = "INSERT INTO userstable (username, password) VALUES (?,?)"  <--> con.Query(sqlInsertUser,(username,password), function ...)
    let sqlInsertUser = "INSERT INTO userstable SET ?";

    let userObject = {
        username: req.body.usernameName,
        password: req.body.passwordName
    };

    connection.query(sqlGetAll, userObject.username, (err, result) => {
        if (err) {
            return done(err);
        }
        if (result.length !== 0) {
            console.log('The User is already registered');
            return;
        }
        connection.query(sqlInsertUser, userObject, (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: ", result.affectedRows);
            // $("label[for='status']").text("10 kms");
            // document.getElementById('statusId').innerText = "username " + userObject.username + " added successfully...";
        });

    });

});

module.exports = router;