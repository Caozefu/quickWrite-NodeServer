exports.returnSuccess = (data, msg) => {
    const success = require('../resTemplate/success');
    if (data) {
        success.message = msg || '成功';
        success.data = data;
    }
    delete require.cache[require.resolve('../resTemplate/success')];
    return JSON.stringify(success);
};

exports.returnError = (code, msg) => {
    const error = require('../resTemplate/error');
    if (code) error.code = code;
    if (msg) error.message = msg;
    delete require.cache[require.resolve('../resTemplate/error')];
    return JSON.stringify(error);
};
