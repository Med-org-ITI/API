const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

const dbconnection = require('./config/database');
// Routes
const itemRouter = require('./router/itemRoute');
const userRoute = require('./router/userRoute');
const authRoute = require('./router/authRoute');

// Connect with DB.
dbconnection();

// express app
const app = express();
app.use(express.json());


// upload image
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

const sessionStore = new ConnectMongoDBSession({
	uri: process.env.MONGODB_URI,
	collection: 'session',
});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
		cookie: { maxAge: 2 * 60 * 60 * 1000 },
	})
);


// Middlewares


if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	console.log(`mode: ${process.env.NODE_ENV}`);
} else {
	console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routers
app.use('/users', userRoute);
app.use('/items', itemRouter);
app.use('/auth', authRoute);

app.all('*', (req, res, next) => {
	next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware for express
app.use(globalError);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
});

// Handle rejection outside express
process.on('unhandledRejection', err => {
	console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}}`);
	server.close(() => {
		console.log('Shutting down...');
		process.exit(1);
	});
});
