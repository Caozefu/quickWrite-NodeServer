module.exports = function (connection, token, callback) {
    // search user Info
    const addInfoSql = `SELECT * from user_info WHERE token = '${token}';`;

    connection.query(addInfoSql, function (err, result) {
        if (err) {
            console.log('[SEARCH ERROR] - ', err.message);
            callback(false);
            return;
        }
        callback(result);
    });
}
