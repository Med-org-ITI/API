const express = require('express');
const session = require('express-session');
const connectMongoDBSession = require('connect-mongodb-session')(session);
const db = require('./database');

const authRouter = require('./router/auth');
const itemRouter = require('./router/item');
const cartRouter = require('./router/cart');
const orderRouter = require('./router/order');

const adminRouter = require('./router/admin');
const adminAuthRouter = require('./router/adminAuth');
const isAdmin = require('./middleware/admin-auth');

require('dotenv').config();

const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const dbconnection = require("./config/database");
const userRoute = require("./routes/userRoute");
const globalError = require("./middlewares/errorMiddleware");
const ApiError = require("./utlis/apiError");
// Connect with DB.
dbconnection();

// express app
const app = express();

const sessionStore = new connectMongoDBSession({
	uri: process.env.MONGODB_URI,
	collection: 'session',
});

app.use(express.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
		cookie: { maxAge: 2 * 60 * 60 * 1000 },
	})
);

app.use('/admin', adminAuthRouter);
app.use('/admin', isAdmin, adminRouter);
app.use('/items', itemRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use(authRouter);

app.use((err, _req, res, next) => {
	res.status(err.statusCode || 500).json(err.message);
});

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
} else {
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routers
app.use("/api/iti/users", userRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const port = process.env.PORT || 5000;

db();
const server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
