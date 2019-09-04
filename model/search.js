const db = require('../libs/database');

module.exports = async (date) => {
    const searchSql1 = `SELECT * from countInfo WHERE date = '${date}'`;
    return await db.query(searchSql1);
};
