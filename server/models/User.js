const mongoose = require('mongoose');
Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String
	},
	business: {
		type: Boolean,
		default: false
	},
	profile: {
		type: Schema.ObjectId
	}
});

module.exports = User = mongoose.model('user', UserSchema);
