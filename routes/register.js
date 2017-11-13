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

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'userMA3',
    password: 'passMA3',
    // port: '3306',
    database: 'webapp'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connection as id ' + connection.threadId);
    return connection;
});

// Get Register Page
router.get('/', function (req, res, next) {
    res.render("register");
});


router.post('/', function (req, res, next) {
    let username = req.body.usernameName;
    let password = req.body.passwordName;
    let sqlFindUser = "SELECT * FROM userstable WHERE username=?";
    let sqlInsertUser = "INSERT INTO userstable (username, password) VALUES ?";

    connection.query(sqlFindUser, username, (err, result) => {
        if (err) {
            return done(err);
        }
        if (result.length !== 0) {
            console.log('The User is already registered');
            return;
        }
        connection.query("INSERT INTO userstable (username, password) VALUES (?,?)", [username, password], (err, result) => {
            if (err) throw err;
            console.log("Number of records inserted: ", result.affectedRows);
            // $("label[for='status']").text("10 kms");
            // document.getElementById('statusId').innerText = "username " + username + " added successfully...";
        });

    });
    console.log('user: ' + username + ', password: ' + password);

});


module.exports = router;