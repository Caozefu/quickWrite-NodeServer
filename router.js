const express = require('express');
const router = express.Router();
const controller = require('./controller');

// 查询
router.get('/search', controller.searchCountInfo);
// 获取所有记录
router.get('/getTotalItems', controller.getTotalItem);
router.get('/getCurrentInfo', controller.getCurrentInfo);
router.get('/getUserInfo', controller.getUserInfo);
router.get('/login/status', controller.loginStatus);
router.post('/register', controller.register);
router.post('/login', controller.login);
// router.post('/save', controller.save);

module.exports = router;
