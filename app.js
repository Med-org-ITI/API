const express = require('express');
const session = require('express-session');
const ConnectMongoDBSession = require('connect-mongodb-session')(session);

const morgan = require('morgan');
const authRouter = require('./router/authRoute');
const itemRouter = require('./router/itemRoute');
const cartRouter = require('./router/cartRoute');
const orderRouter = require('./router/orderRoute');

const adminRouter = require('./router/adminRoute');
const adminAuthRouter = require('./router/adminAuth');
const isAdmin = require('./middlewares/admin-auth');

require('dotenv').config();

const dbconnection = require('./config/database');
const userRoute = require('./router/userRoute');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utlis/apiError');
// Connect with DB.
dbconnection();

// express app
const app = express();
app.use(express.json());

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
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routers
app.use('/api/iti/users', userRoute);
app.use('/admin', adminAuthRouter);
app.use('/admin', isAdmin, adminRouter);
app.use('/api/iti/items', itemRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use(authRouter);

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
