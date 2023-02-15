const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      throw new Error("user doesn't exists");
    }
    const isValid = await bcrypt.compare(
      password + process.env.PEPPER,
      admin.password
    );
    if (isValid) {
      req.session.isLoggedIn = true;
      req.session.user = admin;
      await req.session.save();
      res.json('session created');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logout = async (req, res) => {
  try {
    await req.session.destroy();
    res.json('end session');
  } catch (err) {
    res.status(500).json(err);
  }
};
