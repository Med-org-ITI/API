const jwt = require('jsonwebtoken');
const util = require('util');
const customError = require('../customError');

const secretkey = process.env.SECRET_KEY || "dsknfkdjfnsdkjvd"; // default if not found secretKey

// const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);

const authorizeUser = async (req, res, next) =>{
    const { id } = req.params;
    const { authorization: token } = req.headers;
    try{
        const payload = await verifyAsync(token, secretkey);
        if(payload.id !== id) throw customError(403, "You Are Not Authorized To Perform This Action");
        next();
    } catch(error){
        next(customError(403, "You Are Not Authorized To Perform This Action"));
    }
}

module.exports = authorizeUser;
