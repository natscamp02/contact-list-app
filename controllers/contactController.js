const Contact = require('../models/Contact');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.handleImageUpload = catchAsync(async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, { thumbnail: req.file.filename }, { new: true });

	res.status(200).json({ status: 'success', data: { contact } });
});

exports.getAllContacts = catchAsync(async (req, res) => {
	const contacts = await Contact.find({ owner: req.user._id });

	res.status(200).json({
		status: 'success',
		results: contacts.length,
		data: {
			contacts,
		},
	});
});

exports.getContactById = catchAsync(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) throw new AppError('No contact found', 404);

	res.status(200).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.createContact = catchAsync(async (req, res) => {
	const data = req.body;
	data.owner = req.user._id;

	console.log(data);

	if (req.file) {
		data.thumbnail = req.file.filename;
	}

	const contact = await Contact.create(data);

	res.status(201).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.updateContactById = catchAsync(async (req, res) => {
	// Update contact with thumbnail if present
	if (req.file) {
		req.body.thumbnail = req.file.filename;
	}

	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (!contact) throw new AppError('No contact found', 404);

	res.status(200).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.deleteContactById = catchAsync(async (req, res) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);

	if (!contact) throw new AppError('No contact found', 404);

	res.status(204).json({
		status: 'success',
		data: {
			contact: null,
		},
	});
});
