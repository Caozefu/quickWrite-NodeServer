// 格式化时间，YYYY-MM-DD
function formatDate(timestamp) {
    const year = new Date(timestamp).getFullYear();
    let month = new Date(timestamp).getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let date = new Date(timestamp).getDate();
    date = date >= 10 ? date : '0' + date;
    return `${year}-${month}-${date}`;
}

/*
* @params arr 带排序的对象数组
* @params attr 待排序的属性
* @params type 排序类型 0：从小到大 1：从大到小
* */
function sort(arr, attr, type) {
    if (typeof arr[0][attr] === 'function') return;
    let attrs = [];
    let res = [];
    arr.forEach(item => {
        attrs.push(item[attr]);
    });
    attrs.sort((item1, item2) => {
        if (item1 > item2) {
            return type ? -1 : 1
        } else {
            return type ? 1 : -1
        }
    });
    attrs.forEach(item => {
        for (let i of arr) {
            if (i[attr] === item) {
                res.push(i)
            }
        }
    });
    return res;
}

exports.formatDate = formatDate;
exports.sort = sort;
