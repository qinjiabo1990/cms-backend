const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'});
    return token;
}

const validateToken = (token) => {
    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch(e){
        return null;
    }
    return decoded;
}

module.exports = {generateToken, validateToken}