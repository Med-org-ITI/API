const mongoose = require('mongoose');
const Admin = require('./models/admin');
const { hash } = require('bcrypt');

const db = async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect(process.env.MONGODB_URI).then(async () => {
		console.log('db connected');
		const admin = await Admin.findOne();
		if (!admin) {
			const hashedPassword = await hash(process.env.ADMIN_PW + process.env.PEPPER, +process.env.SR);
			const admin = new Admin({
				email: process.env.ADMIN_EMAIL,
				password: hashedPassword,
			});
			await admin.save();
		}
	});
};

module.exports = db;
