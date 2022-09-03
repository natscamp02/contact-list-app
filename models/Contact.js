const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Please enter a first name'],
	},
	last_name: {
		type: String,
		required: [true, 'Please enter a last name'],
	},

	email: {
		type: String,
		required: [true, 'Please enter a valid email address'],
	},

	contact_num: {
		type: Number,
		required: [true, 'Please enter a contact number'],
	},

	owner: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: [true, 'Please enter a valid owner id'],
	},
});

ContactSchema.pre('find', function (next) {
	this.populate('owner');
	next();
});

module.exports = mongoose.model('Contact', ContactSchema);
