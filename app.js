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

const port = process.env.PORT || 3000;

db();
app.listen(port, () => {
	console.log('server is running on http://localhost:' + port);
});
