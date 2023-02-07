const Joi = require('joi');
const customError = require('./customError');

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .alphanum()
        .min(8)
        .max(30),
    address: Joi.string(),
    image: Joi.string(),
    gender: Joi.string(),

});

const userValidation = async (req, res, next) =>{
    try{
        await schema.validateAsync(req.body);
        next();
    } catch(error){
        error.statusCode = 422;
        next(error);
    }
}

module.exports = userValidation;
