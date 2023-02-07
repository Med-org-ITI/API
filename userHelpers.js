const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const customError = require('./customError');

const secretkey = process.env.SECRET_KEY || "dsknfkdjfnsdkjvd";

const signAsync = util.promisify(jwt.sign);
// const verifyAsync = util.promisify(jwt.verify);

const saltRounds = 10; // 2^10

const hashPassword = async(password) => bcrypt.hash(password, saltRounds);

const comparePassword = async(password, hash) =>{
    const isCorrectPassword = await bcrypt.compare(password, hash);
    if(!isCorrectPassword) throw customError(401, "Invalid Username or Password");
}
    
const SignUserToken = async (id) => signAsync({ id }, secretkey, { expiresIn: '1w' }); // token will expire after 1h

module.exports = {
    hashPassword,
    comparePassword,
    SignUserToken
}