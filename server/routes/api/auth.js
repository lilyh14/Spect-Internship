const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const JsonSecret = require('../../config/config').JSONSecret;

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

router.post(
	'/',
	[
		check('email', 'Invalid Email, please Include valid email').isEmail(),
		check('password', 'Please enter your password').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Wrong email and /or password. Please try again' } ] });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return res.status(400).json({ errors: [ { msg: 'Wrong email and /or password. Please try again' } ] });
			}

			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, JsonSecret, { expiresIn: '1h' }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
