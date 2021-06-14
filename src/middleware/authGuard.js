const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        //204 No content
        //status().json({error: "msg"})
        return res.sendStatus(401);
    }

    const contentArray = authHeader.split(' ');
    if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') { //Bearer is a standard encoding format
        return res.status(401).json({error:'bearer'});
    }

    const decoded = validateToken(contentArray[1]); // result is payload
    if (!decoded) {
        return res.status(401).json({error:'decoded'});
    }
    
    req.user = decoded;
    next();
}