const express = require('express');
const router = express.Router();
const mysql = require('../mysql/index')
let errRes = require('../resTemplate/error');

router.post('/save', (req, res) => {
    const currentSuccessRes = require('../resTemplate/success');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (req.body.date) {
        if (!mysql.save(req.body)) {
            errRes.message = '数据保存失败';
            res.end(JSON.stringify(errRes));
        }
        res.end(JSON.stringify(currentSuccessRes));
    } else {
        errRes.message = '日期不能为空';
        res.end(JSON.stringify(errRes));
    }
});

router.get('/getCurrentInfo', (req, res) => {
    const timestamp = Number(req.query.timestamp);
    const currentSuccessRes = require('../resTemplate/success');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (!timestamp) {
        errRes.message = '请检查时间是否正确';
        res.end(JSON.stringify(errRes));
    }
    mysql.search(timestamp, (data) => {
        if (!data[0].length) {
            currentSuccessRes.data = {};
            currentSuccessRes.message = '当天无数据';
            res.end(JSON.stringify(currentSuccessRes));
        } else {
            currentSuccessRes.data = {};
            currentSuccessRes.data = data[0][0];
            currentSuccessRes.data.inCountList = data[1][0];
            currentSuccessRes.data.outCountList = data[2];
            // console.log(data[2][0]);
            res.end(JSON.stringify(currentSuccessRes));
        }
    });
});

module.exports = router;
