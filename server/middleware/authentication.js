const jwt = require('jsonwebtoken');
const JsonSecret = require('../config/config.js').JSONSecret;

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({ msg: 'No token, authentication denied' });
	}

	try {
		const decodedToken = jwt.verify(token, JsonSecret);

		req.user = decodedToken.user;
		next();
	} catch (e) {
		res.status(401).json({ msg: 'Invalid Token' });
	}
};
