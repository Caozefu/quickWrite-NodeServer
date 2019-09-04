const resJson = require('../../utils/resJson');
const searchModel = require('../../model/search');

module.exports = async (req, res) => {
    const date = req.query.date;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (!date) res.end(resJson.returnError(500, '参数不能为空'));

    searchModel(date).then(res => {
        res.end(JSON.stringify(resJson.returnSuccess(res)));
    }).catch(e => {
        res.end(resJson.returnError(500, '查询数据出错，请检查参数是否正确'));
    });
};
