const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then((con) => {
    console.log(`connect successfuly at : ${con.connection.host}`);
  });
};

module.exports = dbConnection;
