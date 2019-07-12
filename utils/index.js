function formatDate(timestamp) {
    const year = new Date(timestamp).getFullYear();
    let month = new Date(timestamp).getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let date = new Date(timestamp).getDate();
    date = date >= 10 ? date : '0' + date;
    return `${year}-${month}-${date}`;
}

exports.formatDate = formatDate;