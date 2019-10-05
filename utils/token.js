const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

exports.getToken = (data) => {
    if (!data) return;
    const cert = fs.readFileSync(path.join(__dirname, '../libs/rsa_private_key.pem'));
    const token = jwt.sign({
        data,
        expiresIn: '10000'  // 1小时过期
    }, cert, {algorithm: 'RS256'});
    return token || '';
};

exports.verifyToken = (token) => {
    if (!token) return;
    const cert = fs.readFileSync(path.join(__dirname, '../libs/rsa_public_key.pem'));
    const data = jwt.verify(token, cert, { algorithms: ['RS256'] });
    return data || {};
};
