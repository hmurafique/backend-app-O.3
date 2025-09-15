const User = require("../models/User");

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};
