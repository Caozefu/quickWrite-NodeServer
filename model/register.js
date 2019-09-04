const db = require('../libs/database');
const md5 = require('md5');

module.exports = async (body) => {
    const { name, password, phone, nickname, sex } = body;
    const addInfoSql = `INSERT INTO user_info ( user_uid, user_name, password, phone, nickname, sex ) VALUES ( 0, "${name}", "${md5(password)}", "${phone}", "${nickname}", "${sex}" );`;
    return await db.query(addInfoSql);
};
