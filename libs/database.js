const mysql = require('mysql');
const DB_CONFIG = require('../config');
const co = require('co-mysql');

const pool = mysql.createPool({
    host: DB_CONFIG.DB_HOST,
    user: DB_CONFIG.DB_USER,
    password: DB_CONFIG.DB_PASSWORD,
    port: DB_CONFIG.DB_PORT,
    database: DB_CONFIG.DB_NAME,
});

module.exports = co(pool);
