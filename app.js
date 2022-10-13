require('dotenv').config({ path: './config.env' });

const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const contactRouter = require('./routes/contactRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');

const AppError = require('./utils/appError');

const app = express();

app.use(cors('*'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);
app.get('/', (_, res) => res.sendStatus(200));

app.all('*', (_req, _res, next) => next(new AppError('Url not found', 404)));
app.use(globalErrorHandler);

mongoose
	.connect(process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD))
	.then(() => console.log('Connected to database...'))
	.catch((err) => {
		console.err(err);
		process.exit(1);
	});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listen on port ${port}...`));
