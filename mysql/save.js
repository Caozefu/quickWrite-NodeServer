let completeFlag = true;
const save = function(data, connection, callback) {
    const date = data.date;
    // //add Info
    const addInfoSql = 'INSERT INTO countInfo(id, date, inCount, outCount) VALUES (0,?,?,?)';
    const addInfoParams = [date, data.inCount, data.outCount];
    
    connection.query(addInfoSql, addInfoParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            completeFlag = false;
            return;
        }
        console.log('INSERT info Success');
    });

    // addInCountDetail
    const addInCountDetailSql = 'INSERT INTO inCountDetail(id, wx, alipay, count, meituan, eleme, date) VALUES (0,?,?,?,?,?,?)';
    const addInCountDetailParams = [data.inCountList.wx || 0, data.inCountList.alipay || 0, data.inCountList.count || 0, data.inCountList.meituan || 0, data.inCountList.eleme || 0, date];

    connection.query(addInCountDetailSql, addInCountDetailParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            completeFlag = false;
            return;
        }
    
        console.log('INSERT InCountDetail Success');
    });

    // addOutCountList

    const addOutCountDetailSql = 'INSERT INTO outCountList(id, name, outCount, createdDate) VALUES ?';
    let addOutCountDetailParams = [];
    data.outCountList.forEach(item => {
        let count = item.outCount || 0.00;
        addOutCountDetailParams.push([0, item.name, count, date])
    });

    connection.query(addOutCountDetailSql, [addOutCountDetailParams], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            completeFlag = false;
            return;
        }
    
        console.log('INSERT OutCountList Success');
    });

    callback(completeFlag);
}

exports.save = save;