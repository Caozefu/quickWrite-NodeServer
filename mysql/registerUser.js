module.exports = function(connection, userInfo, token, callback) {
    // save user Info
    const addInfoSql = 'INSERT INTO user_info(user_id, user_name, password, phone, token) VALUES (0,?,?,?,?)';
    const addInfoParams = [userInfo.name, userInfo.password, userInfo.phone, token];

    connection.query(addInfoSql, addInfoParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            callback(false);
            return;
        }
        callback(true);
    });
}
