const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI).then(async (con) => {
    console.log(`connect successfuly at : ${con.connection.host}`);
  });
};

module.exports = dbConnection;
