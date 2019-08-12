module.exports = function (connection, params, callback) {
    // search user Info
    const searchUser = `SELECT * from user_info WHERE user_name = '${params.name}';`;

    connection.query(searchUser, function (err, result) {
        if (err) {
            console.log('[SEARCH ERROR] - ', err.message);
            callback(false);
            return;
        }
        if (!result.length) {
            callback({
                status: 0,
                msg: '用户不存在'
            });
        } else {
            if (params.password === result[0].password) {
                callback({
                    status: 1,
                    msg: '登陆成功',
                    token: result[0].token
                })
            } else {
                callback({
                    status: 0,
                    msg: '密码错误'
                })
            }
        }
    });
}
