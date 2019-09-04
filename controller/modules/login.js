const resJson = require('../../utils/resJson');
const loginModel = require('../../model/login');
const tokenUtils = require('../../utils/token');
const md5 = require("md5");

module.exports = async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    const {name, password, phone} = req.body;
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
