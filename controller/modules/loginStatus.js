const resJson = require('../../utils/resJson');
const tokenUtils = require('../../utils/token');
const loginModel = require('../../model/login');

module.exports = async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

    const token = req.headers.authorization;
    if (!token || token === 'undefined') {
        res.end(resJson.returnError(500, '用户未登陆'));
        return;
    }

    const data = tokenUtils.verifyToken(token);
    await loginModel(data.data).then(data => {
        if (data.length) {
            res.end(resJson.returnSuccess('', '用户已登陆'))
        } else {
            res.end(resJson.returnError(500, '用户未登陆'));
        }
    }).catch(e => {
        res.end(resJson.returnError(500, '用户未登陆'));
    })
};
