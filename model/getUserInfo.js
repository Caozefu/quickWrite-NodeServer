const db = require('../libs/database');

module.exports = async (uid) => {
    const search = `SELECT * FROM user_info WHERE user_uid = ${uid};`;
    return await db.query(search);
};
