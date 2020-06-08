const User = require("../models/user.models");
const encryption = require("../middleware/encryption");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    const { password, email, phone } = req.body;
    const hashedPassword = await encryption.encryptPassword(password);
    const userObj = {
      phone: phone,
      email: email,
      password: hashedPassword,
    };
    const user = new User(userObj);
    try {
      await user.save();
      return res.json("User Created Successfully");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist!!! Please sign up",
      });
    }
    try {
      const result = await encryption.validatePassword(password, user);
      if (result) {
        const newObj = {
          id: user._id,
          email: user.email,
        };
        const token = jwt.sign(newObj, process.env.JWT_SECRET, {
          expiresIn: "1h",
          algorithm: "HS256",
        });
        res.json({
          message: "Auth Successful",
          token: token,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Auth failed" });
    }
  },

  signout: (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Signout Successful" });
  },
};