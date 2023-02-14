const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./router/auth');

const app = express();
require('dotenv').config();

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'uploads'))); 
app.use(authRoutes);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/users').then(_ =>{
	console.log('database connect successfully');
});

app.use(authRoutes);


const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
	// console.log(err.message);
    if(!err.statusCode){
        err.message = "Something Went Wrong";
    }
    res.status(err.statusCode || 500).json(err.message);
});

app.listen(port, () => {
	console.log('server is running on http://localhost:' + port);
});
