module.exports = (req, res, next) => {
	try {
		if (!req.session.isLoggedIn) {
			throw new Error('you are not allowed to do this action');
		}
		next();
	} catch (err) {
		res.status(401).json(err);
	}
};
