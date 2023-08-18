const User = require("../models/User");

exports.addUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const data = await User.create({
      name: name,
      email: email,
      mobile: mobile,
    });
    return res.status(201).json({ newUser: data });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const data = await User.findByPk(id).then((user) => user.destroy());
    return res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
