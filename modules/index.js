const express = require('express');
const router = express.Router();
const mysql = require('../mysql/index');
const utils = require('../utils/index');
const currentSuccessRes = require('../resTemplate/success');
let errRes = require('../resTemplate/error');

router.post('/save', (req, res) => {
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (req.body.date) {
        mysql.save(req.body, (saveRes) => {
            if (saveRes) {
                res.end(JSON.stringify(successRes));
            } else {
                errRes.message = '数据保存失败';
                res.end(JSON.stringify(errRes));
            }
        })
    } else {
        errRes.message = '日期不能为空';
        res.end(JSON.stringify(errRes));
    }
});

router.get('/getCurrentInfo', (req, res) => {
    const timestamp = req.query.timestamp;
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (!timestamp) {
        errRes.message = '请检查时间是否正确';
        res.end(JSON.stringify(errRes));
    }
    mysql.search(timestamp, (data) => {
        if (!data[0].length) {
            successRes.data = {};
            successRes.message = '当天无数据';
            res.end(JSON.stringify(successRes));
        } else {
            successRes.data = {};
            successRes.data = data[0][0];
            successRes.data.inCountList = data[1][0];
            successRes.data.outCountList = data[2];
            // console.log(data[2][0]);
            res.end(JSON.stringify(successRes));
        }
    });
});

router.get('/getTotalItems', (req, res) => {
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    mysql.getTotal((SQLres) => {
        if (req.query.sortType && req.query.sortKey) {
            successRes.data = utils.sort(SQLres, req.query.sortKey, parseInt(req.query.sortType));
        } else {
            successRes.data = utils.sort(SQLres, 'date', 1);
        }
        res.end(JSON.stringify(successRes));
    });
});

router.get('/getUserInfo', (req, res) => {
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    let token = req.headers.authorization;
    if (!token || token === 'undefined') {
        errRes.message = '未登录';
        res.end(JSON.stringify(errRes));
    } else {
        mysql.getUserInfo(token, (data) => {
            if (!data) {
                errRes.message = '未登录';
                res.end(JSON.stringify(errRes));
            }
            successRes.data = data;
            res.end(JSON.stringify(successRes));
        });
    }
});

router.post('/register', (req, res) => {
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    //查询用户名是否存在
    mysql.register(req.body, (body) => {
        if (!body.status) {
            errRes.message = body.msg;
            res.end(JSON.stringify(errRes));
        } else {
            successRes.token = body.token || '';
            res.end(JSON.stringify(successRes));
        }
    });
});

router.post('/login', (req, res) => {
    let successRes = JSON.parse(JSON.stringify(currentSuccessRes));
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    mysql.login(req.body, (body) => {
        if (body.status && body.token) {
            successRes.message = body.msg;
            successRes.token = body.token;
            res.end(JSON.stringify(successRes));
        }
        else {
            errRes.message = body.msg;
            res.end(JSON.stringify(errRes));
        }
    })
});

module.exports = router;
