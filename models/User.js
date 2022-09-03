const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Please enter a username'],
	},

	password: {
		type: String,
		required: [true, 'Please enter a password'],
		select: false,
	},

	role: {
		type: String,
		required: [true, 'Please select a role'],
		enum: {
			values: ['admin', 'user'],
			message: 'Can either be a user or an admin',
		},
	},
});

UserSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

UserSchema.method('isCorrectPassword', async function (userPassword) {
	return await bcrypt.compare(userPassword, this.password);
});

module.exports = mongoose.model('User', UserSchema);
