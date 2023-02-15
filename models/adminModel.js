const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const Admin = model('Admin', adminSchema);

module.exports = Admin;
