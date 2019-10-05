const resJson = require('../../utils/resJson');
const tokenUtils = require('../../utils/token');
const getUserInfoModel = require('../../model/getUserInfo');

module.exports = async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    let token = req.headers.authorization;
    if (!token || token === 'undefined') {
        res.end(JSON.stringify(resJson.returnError(500, '用户未登录')));
        return;
    }

    const data = tokenUtils.verifyToken(token);
    await getUserInfoModel(data.data.user_uid).then(data => {
        if (data.length) {
            delete data[0].password;
            if (!data[0].nickname) {
                data[0].nickname = '用户000' + data[0].user_uid;
            }
            res.end(resJson.returnSuccess(data[0]));
        } else {
            res.end(resJson.returnError(500, '未找到用户信息'));
        }
    }).catch(e => {
        res.end(resJson.returnError(500, '未找到用户信息'));
    })

};
