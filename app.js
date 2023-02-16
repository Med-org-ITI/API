const path = require('path');
const express = require('express');

const morgan = require('morgan');
const itemRouter = require('./router/itemRoute');
const cartRouter = require('./router/cartRoute');
const orderRouter = require('./router/orderRoute');

require('dotenv').config();

const dbconnection = require('./config/database');
const userRoute = require('./router/userRoute');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utils/apiError');
// Connect with DB.
dbconnection();

// express app
const app = express();
app.use(express.json());

// upload image
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routers
app.use('/api/iti/users', userRoute);
app.use('/api/iti/items', itemRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}}`);
  server.close(() => {
    console.log('Shutting down...');
    process.exit(1);
  });
});
