const jwt = require('jsonwebtoken');

const secret = "secret";
const payload = {
    id: 1234
};

const token = jwt.sign(payload, secret, {expiresIn: '1d'}); //以毫秒ms 为单位 或者 string

console.log(token);