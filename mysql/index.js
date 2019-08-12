const mysql = require('mysql');
const utils = require('../utils/index');
const jwt = require('jsonwebtoken');
const connection = mysql.createConnection({
    // host: '35.240.140.11',
    host: 'localhost',
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
const hasRegistered = require('./hasRegistered');
const registerUser = require('./registerUser');
const userInfo = require('./getUserInfo');
const loginSQL = require('./login');


connection.connect();

const save = function (data, callback) {
    const currentDate = data.date;
    shouldUpdate(currentDate, connection, (res) => {
        if (res) {
            updateSQL.update(data, currentDate, connection, callback);
        } else {
            saveSQL.save(data, connection, callback);
        }
    })
};

const search = function (timestamp, callback) {
    if (timestamp) {
        // const date = utils.formatDate(timestamp);
        searchSQL.search(timestamp, connection, callback);
    }
};

const getTotal = function (callback) {
    const totalData = [];
    getTotalList(connection, (res) => {
        res.date.forEach(item => {
            let dataItemTemp = {
                inCountList: {},
                outCountList: []
            };
            dataItemTemp.date = '' + new Date(item).getTime();
            // const searchDate = utils.formatDate(item);

            res.countInfos.forEach(infoItem => {
                if (utils.formatDate(infoItem.date) == utils.formatDate(item)) {
                    Object.assign(dataItemTemp, infoItem);
                }
            });

            res.inCountDetails.forEach(incountItem => {
                if (utils.formatDate(incountItem.date) == utils.formatDate(item)) {
                    dataItemTemp.inCountList = incountItem;
                }
            });

            res.outCountList.forEach(outcountItem => {
                if (utils.formatDate(outcountItem.createdDate) == utils.formatDate(item)) {
                    dataItemTemp.outCountList.push(outcountItem);
                }
            });

            totalData.push(dataItemTemp);
        });
        // callback(utils.sort(totalData, 'date', 0));
        callback(totalData);
    });
};

const login = function (params, callback) {
    loginSQL(connection, params, (res) => {
        if (!res) {
            callback({status: 0, msg: '登陆失败，请稍后重试'});
            return;
        }
        callback(res);
    })
};

const register = function (userInfo, callback) {
    hasRegistered(connection, userInfo.name, (res) => {
        if (!res) {
            const content = {
                name: userInfo.name
            };
            const privateKey = 'qw_token';
            let token = jwt.sign(content, privateKey, {
                expiresIn: '48h'  // 1小时过期
            });
            registerUser(connection, userInfo, token, (res) => {
                if (res) {
                    callback({
                        status: 1,
                        msg: '注册成功',
                        token: token
                    });
                } else {
                    callback({
                        status: 0,
                        msg: '注册失败，请稍后重试'
                    });
                }
            })
        } else {
            callback({
                status: 0,
                msg: '用户名已存在'
            });
        }
    });
};

const getUserInfo = function (token, callback) {
    userInfo(connection, token, (data) => {
        if (!data) {
            callback(false);
        }
        let res = JSON.parse(JSON.stringify(data[0]));
        delete res.token;
        callback(res);
    });
};

exports.save = save;
exports.search = search;
exports.getTotal = getTotal;
exports.register = register;
exports.getUserInfo = getUserInfo;
exports.login = login;
