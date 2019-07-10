const express = require('express');
const router = express.Router();
const successRes = require('../resTemplate/success');
let errRes = require('../resTemplate/error');

router.post('/', (req, res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if (req.body.date) {
        res.end(JSON.stringify(successRes));
    } else {
        errRes.message = '日期不能为空';
        res.end(JSON.stringify(errRes));
    }
});

module.exports = router;
