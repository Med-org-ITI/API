const { verify } = require('jsonwebtoken');
module.exports = (req, res, next) => {
	try {
		const { authorization: token } = req.headers;

		const payload = verify(token, 'Secret');
		res.locals.userId = payload.id;

		next();
	} catch (err) {
		res.status(401).json(err);
	}
};
