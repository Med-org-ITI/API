const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./router/auth');

const app = express();

app.use(express.json()); // body parse --> req.body
app.use(authRoutes);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/users').then(_ =>{
	console.log('database connect successfully');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('server is running on http://localhost:' + port);
});
