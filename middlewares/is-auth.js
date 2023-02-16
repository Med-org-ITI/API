const jwt = require('jsonwebtoken');
const util = require('util');
const ApiError = require('../utils/apiError');

const verifyAsync = util.promisify(jwt.verify);

const authorizeUser = async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  try {
    const payload = await verifyAsync(token, process.env.SECRET_KEY);
    if (payload.id !== id)
      throw new ApiError('You Are Not Authorized To Perform This Action', 403);
    next();
  } catch (error) {
    next(new ApiError('You Are Not Authorized To Perform This Action', 403));
  }
};

module.exports = authorizeUser;
