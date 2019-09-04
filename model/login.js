const db = require('../libs/database');

module.exports = async (data) => {
    const { name, password, phone } = data;
    const searchKey = name ? 'user_name' : 'phone';
    const searchValue = name ? name : phone;
    const searchSQL = `SELECT * FROM user_info WHERE ${searchKey} = "${searchValue}" AND password = "${password}"`;
    return await db.query(searchSQL);
};
