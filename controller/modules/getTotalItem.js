const resJson = require('../../utils/resJson');
const getTotalModel = require('../../model/getTotalItem');
const utils = require('../../utils');

module.exports = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    let obj = [];
    getTotalModel().then(data => {
        data.date.forEach(item => {
            let dataItemTemp = {
                inCountList: {},
                outCountList: []
            };
            dataItemTemp.date = '' + new Date(item).getTime();

            data.countInfos.forEach(infoItem => {
                if (utils.formatDate(infoItem.date) == utils.formatDate(item)) {
                    Object.assign(dataItemTemp, infoItem);
                }
            });

            data.inCountDetails.forEach(incountItem => {
                if (utils.formatDate(incountItem.date) == utils.formatDate(item)) {
                    dataItemTemp.inCountList = incountItem;
                }
            });

            data.outCountList.forEach(outcountItem => {
                if (utils.formatDate(outcountItem.createdDate) == utils.formatDate(item)) {
                    dataItemTemp.outCountList.push(outcountItem);
                }
            });

            obj.push(dataItemTemp);
        });
        res.end(resJson.returnSuccess(obj));
    }).catch(e => {
        res.end(resJson.returnError(500, e));
    })
};
