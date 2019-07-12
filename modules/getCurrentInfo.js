const express = require('express');
const router = express.Router();
const successRes = require('../resTemplate/success');
const mysql = require('../mysql/index')
let errRes = require('../resTemplate/error');

router.get('/getCurrentInfo', (req, res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    console.log(req.query);
    // if (req.query) {
    //     if (!mysql.save(req.body)) {
    //         errRes.message = '数据保存失败';
    //         res.end(JSON.stringify(errRes));
    //     }
        res.end(JSON.stringify(successRes));
    // } else {
    //     errRes.message = '日期不能为空';
    //     res.end(JSON.stringify(errRes));
    // }
});

module.exports = router;
