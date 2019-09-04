const db = require('../libs/database');

module.exports = () => {
    const search = 'SELECT date from countInfo;';
    const searchSql1 = `SELECT * from countInfo;`;
    const searchSql2 = `SELECT * from inCountDetail;`;
    const searchSql3 = `SELECT * from outCountList`;
    return new Promise((resolve, reject) => {
        Promise.all([db.query(search), db.query(searchSql1), db.query(searchSql2), db.query(searchSql3)])
            .then(data => {
                const dates = [];
                data[0].forEach(item => {
                    dates.push(item.date);
                });
                const resData = {
                    date: dates,
                    countInfos: data[1],
                    inCountDetails: data[2],
                    outCountList: data[3]
                };
                resolve(resData)
            })
            .catch(e => {
                reject(e);
            })
    });
};
