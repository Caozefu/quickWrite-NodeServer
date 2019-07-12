module.exports = function(connection, callback) {
    // search all
    const search = 'SELECT date from countInfo;'
    const searchSql1 = `SELECT * from countInfo;`;
    const searchSql2 = `SELECT * from inCountDetail;`;
    const searchSql3 = `SELECT * from outCountList`;
    connection.query(search + searchSql1 + searchSql2 + searchSql3, function (err, result) {
        if (err) {
            console.log('[SEARCH ERROR] - ', err.message);
        } else {
            const dates = [];
            result[0].forEach(item => {
                dates.push(item.date);
            })
            callback({
                date: dates,
                countInfos: result[1],
                inCountDetails: result[2],
                outCountList: result[3]
            })
        }
    });
}
