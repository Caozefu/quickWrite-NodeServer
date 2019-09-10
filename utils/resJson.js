exports.returnSuccess = (data, msg) => {
    const success = require('../static/resTemplate/success');
    if (data) {
        success.message = msg || '成功';
        success.data = data;
    }
    delete require.cache[require.resolve('../resTemplate/success')];
    return JSON.stringify(success);
};

exports.returnError = (code, msg) => {
    const error = require('../static/resTemplate/error');
    if (code) error.code = code;
    if (msg) error.message = msg;
    delete require.cache[require.resolve('../resTemplate/error')];
    return JSON.stringify(error);
};
