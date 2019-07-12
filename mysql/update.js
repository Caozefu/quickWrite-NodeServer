const update = function(data, date, connection, callback) {
    // //add Info
    const updateCountInfo = `UPDATE countInfo SET inCount = ${data.inCount}, outCount = ${data.outCount} WHERE date = '${date}';`;
    const updateInCountDetail = `UPDATE inCountDetail SET alipay = ${data.inCountList.alipay}, count = ${data.inCountList.count}, wx = ${data.inCountList.wx}, eleme = ${data.inCountList.eleme}, meituan = ${data.inCountList.meituan} WHERE date = '${date}';`;
    const deleteOutCounts = `DELETE from outCountList WHERE createdDate = '${date}'`;
    
    const addOutCountDetailSql = 'INSERT INTO outCountList(id, name, outCount, createdDate) VALUES ?';
    let addOutCountDetailParams = [];
    data.outCountList.forEach(item => {
        let count = item.outCount || 0.00;
        addOutCountDetailParams.push([0, item.name, count, date])
    });

    // console.log(addOutCountDetailParams.toString);
    connection.query(updateCountInfo + updateInCountDetail + deleteOutCounts, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            callback(false)
        } else {
            connection.query(addOutCountDetailSql, [addOutCountDetailParams], function (addErr, addResult) {
                if (addErr) {
                    console.log('[INSERT ERROR] - ', addErr.message);
                    callback(false)
                } else {
                    callback(true);
                }
            });
        }
    });
}

exports.update = update;