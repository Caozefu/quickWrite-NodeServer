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
const updateSQL = require('./update');
const searchSQL = require('./search');
const shouldUpdate = require('./shouldUpdate');
const getTotalList = require('./getTotalList');


connection.connect();

const save = function (data, callback) {
    const currentDate = utils.formatDate(data.date);
    shouldUpdate(currentDate, connection, (res) => {
        if (res) {
            updateSQL.update(data, currentDate, connection, callback);
        } else {
            saveSQL.save(data, connection, callback);
        }
    })
}

const search = function (timestamp, callback) {
    if (timestamp) {
        // const date = utils.formatDate(timestamp);
        searchSQL.search(timestamp, connection, callback);
    }
}

const getTotal = function (callback) {
    const totalData = [];
    getTotalList(connection, (res) => {
        res.date.forEach(item => {
            let dataItemTemp = {
                inCountList: {},
                outCountList: []
            }
            dataItemTemp.date = '' + new Date(item).getTime();
            // const searchDate = utils.formatDate(item);

            res.countInfos.forEach(infoItem => {
                if (utils.formatDate(infoItem.date) == utils.formatDate(item)) {
                    Object.assign(dataItemTemp, infoItem);
                }
            })

            res.inCountDetails.forEach(incountItem => {
                if (utils.formatDate(incountItem.date) == utils.formatDate(item)) {
                    dataItemTemp.inCountList = incountItem;
                }
            })

            res.outCountList.forEach(outcountItem => {
                if (utils.formatDate(outcountItem.createdDate) == utils.formatDate(item)) {
                    dataItemTemp.outCountList.push(outcountItem);
                }
            })

            totalData.push(dataItemTemp);
        })
        callback(totalData);
    });
}

exports.save = save;
exports.search = search;
exports.getTotal = getTotal;