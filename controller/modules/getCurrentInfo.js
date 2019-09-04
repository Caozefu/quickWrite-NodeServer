const resJson = require('../../utils/resJson');
const searchAllModel = require('../../model/searchAllByDate');

module.exports = (req, res) => {
    const timestamp = req.query.timestamp;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (!timestamp) {
        res.end(resJson.returnError(500, '请检查时间格式是否正确'));
    }
    searchAllModel(timestamp).then(data => {
        if (!data[0].length) {
            res.end(resJson.returnSuccess({}, '当天无数据'));
        } else {
            let obj = data[0][0];
            obj.inCountList = data[1][0];
            obj.outCountList = data[2];
            res.end(resJson.returnSuccess(obj));
        }
    }).catch(e => {
        res.end(resJson.returnError(500, '请检查时间格式是否正确'));
    })
};
