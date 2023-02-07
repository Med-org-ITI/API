const mongoose = require("mongoose");
const { hash } = require("bcrypt");
const Admin = require("../models/admin");

mongoose.set("strictQuery", false);
const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI).then(async (con) => {
    console.log(`connect successfuly at : ${con.connection.host}`);
    let admin = await Admin.findOne();
    if (!admin) {
      const hashedPassword = await hash(
        process.env.ADMIN_PW + process.env.PEPPER,
        +process.env.SR
      );
      admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      await admin.save();
    }
  });
};

module.exports = dbConnection;
