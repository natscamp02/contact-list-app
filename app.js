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

app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);
app.get('/', (_, res) => res.sendStatus(200));

app.all('*', (_req, _res, next) => next(new AppError('Url not found', 404)));
app.use(globalErrorHandler);

module.exports = app;
