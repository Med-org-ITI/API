const mongoose = require("mongoose");
const Admin = require("./models/admin");
const { hash } = require("bcrypt");

mongoose.set("strictQuery", false);
const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI).then(async (con) => {
    console.log(`connect successfuly at : ${con.connection.host}`);
    const admin = await Admin.findOne();
    if (!admin) {
      const hashedPassword = await hash(
        process.env.ADMIN_PW + process.env.PEPPER,
        +process.env.SR
      );
      const admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      await admin.save();
    }
  });
};

module.exports = dbConnection;
