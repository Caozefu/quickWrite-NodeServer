let completeFlag = true;
const search = function(date, connection, callback) {
    console.log(date);
    // search by date
    const searchSql1 = `SELECT * from countInfo WHERE date = '${date}';`;
    const searchSql2 = `SELECT * from inCountDetail WHERE date = '${date}';`;
    const searchSql3 = `SELECT * from outCountList WHERE createdDate = '${date}'`;
    connection.query(searchSql1 + searchSql2 + searchSql3, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            completeFlag = false;
            return;
        }
        // console.log(result);
        callback(result);
    });
}

exports.search = search;