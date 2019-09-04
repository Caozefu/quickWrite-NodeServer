const db = require('../libs/database');

module.exports = async (date) => {
    const searchSql1 = `SELECT * from countInfo WHERE date = '${date}';`;
    const searchSql2 = `SELECT * from inCountDetail WHERE date = '${date}';`;
    const searchSql3 = `SELECT * from outCountList WHERE createdDate = '${date}'`;
    return new Promise((resolve, reject) => {
        Promise.all([db.query(searchSql1), db.query(searchSql2), db.query(searchSql3)])
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e);
            })
    });
};
