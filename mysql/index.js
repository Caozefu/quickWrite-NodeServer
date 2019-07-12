const mysql = require('mysql');
const utils = require('../utils/index')
const connection = mysql.createConnection({
    host: '35.240.140.11',
    // host: 'localhost',
    user: 'root',
    password: 'CAOzefu1997',
    port: '3306',
    database: 'quickWrite',
    multipleStatements: true
});

let sqlStatus = true;
const saveSQL = require('./save');
const searchSQL = require('./search');


connection.connect();

const save = function (data) {
    
    if (saveSQL.save(data, connection)) {
        sqlStatus = true
    } else {
        sqlStatus = false;
    }

    return sqlStatus;
}

const search = function (timestamp, callback) {
    if (timestamp) {
        const date = utils.formatDate(timestamp);
        searchSQL.search(date, connection, callback);
    }
}

exports.save = save;
exports.search = search;