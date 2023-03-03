const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = () => {
	mongoose.connect(process.env.MONGODB_URI).then(async con => {
		console.log(`connect successfuly at : ${con.connection.host}`);
	});
	// mongoose.connect('mongodb://127.0.0.1:27017/med-angular').then(async con => {
	// 	console.log(`connect successfuly at : ${con.connection.host}`);
	// });
};

module.exports = dbConnection;
