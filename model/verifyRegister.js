const db = require('../libs/database');

module.exports = async (key, value) => {
    const searchSql = `SELECT * FROM user_info WHERE ${key} = "${value}"`;
    return await db.query(searchSql);
};
