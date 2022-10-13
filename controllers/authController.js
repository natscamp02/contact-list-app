const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.login = catchAsync(async (req, res, next) => {
	const data = req.body;

	const user = await User.findOne({ username: data.username }).select('+password');
	if (!user) throw new AppError('User not found', 404);

	if (!(await user.isCorrectPassword(data.password))) throw new AppError('Password is incorrect', 400);

	const tokenExpires = 10 * 60;
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: tokenExpires,
	});

	user.password = undefined;
	res.status(200).json({
		status: 'success',
		data: {
			token: token,
			tokenExpires: new Date(Date.now() + tokenExpires * 1000),
			user: user,
		},
	});
});

exports.signup = catchAsync(async (req, res, next) => {
	const data = req.body;

	const newUser = await User.create(data);

	const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

	newUser.password = undefined;
	res.status(201).json({
		status: 'success',
		data: {
			token: token,
			user: newUser,
		},
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	const token = req.get('Authorization');
	if (!token || !token.startsWith('Bearer')) throw new AppError('You must be logged in to access this resource', 400);

	let encryptedString = token.split(' ')[1];
	const decoded = jwt.verify(encryptedString, process.env.JWT_SECRET);
	if (!decoded) throw new AppError('Token is missing or invalid', 400);

	const user = await User.findById(decoded.id);
	req.user = user;

	next();
});

exports.restrictTo = (allowedRoles) =>
	catchAsync(async (req, res, next) => {
		if (allowedRoles.includes(req.user.role)) return next();
		else throw new AppError('You do not have access to this url', 400);
	});
