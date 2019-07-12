const shouldUpdate = function(date, connection, callback) {
    // search by date
    const searchSql1 = `SELECT * from countInfo WHERE date = '${date}'`;
    connection.query(searchSql1, function (err, result) {
        if (err) {
            console.log('[ERROR] - ', err.message);
            completeFlag = false;
            return;
        }
        // console.log(result);
        if (result.length > 0) {
            callback(true);
        } else {
            callback(false)
        }
    });
}

module.exports = shouldUpdate;