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

module.exports = connection;