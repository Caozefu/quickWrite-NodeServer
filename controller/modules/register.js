const resJson = require('../../utils/resJson');
const tokenUtils = require('../../utils/token');
const loginModel = require('../../model/login');
const registerModel = require('../../model/register');
const verifyModel = require('../../model/verifyRegister');
const md5 = require("md5");

module.exports = async (req, res) => {
    let flag = true;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    const {name, password, phone} = req.body;
    // 验证用户名是否存在
    await verifyModel('user_name', name).then(data => {
        if (data.length) {
            res.end(resJson.returnError(500, '用户名已存在'));
            flag = false;
        }
    }).catch(e => {
        res.end(resJson.returnError(500, e));
        flag = false;
    });
    if (!flag) return;
    // 验证手机号是否存在
    await verifyModel('phone', phone).then(data => {
        if (data.length) {
            res.end(resJson.returnError(500, '手机号已存在'));
            flag = false;
        }
    }).catch(e => {
        res.end(resJson.returnError(500, e));
        flag = false;
    });
    if (!flag) return;

    await registerModel(req.body).catch(e => {
        res.end(resJson.returnError(500, e));
        flag = false;
    });
    if (!flag) return;

    await loginModel({name, password: md5(password), phone}).then(data => {
        if (data.length) {
            const tokenData = {
                name: data[0].user_name,
                password: data[0].password,
                phone: data[0].phone,
                user_uid: data[0].user_uid
            };
            res.end(resJson.returnSuccess({token: tokenUtils.getToken(tokenData)}));
        } else {
            res.end(resJson.returnError(500, '用户名或密码错误'));
        }
    }).catch(e => {
        res.end(resJson.returnError(500, '用户名或密码错误'));
    })
};
