const path = require('path');
const express = require('express');
const authRoutes = require('./router/authRoute');

const app = express();
require('dotenv').config();

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'uploads'))); 
app.use(authRoutes);

const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    if(!err.statusCode){
        err.message = "Something Went Wrong";
    }
    res.status(err.statusCode || 500).json(err.message);
});

app.listen(port, () => {
	console.log('server is running on http://localhost:' + port);
});
