module.exports = function(connection, username, callback) {
    // search all
    const search = `SELECT * from user_info WHERE user_name = '${username}';`;
    connection.query(search, function (err, result) {
        if (err) {
            console.log('[SEARCH ERROR] - ', err.message);
        } else {
            callback(result.length > 0)
        }
    });
};
