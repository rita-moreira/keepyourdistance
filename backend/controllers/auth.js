import User from "../models/user.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
dotenv.config();

export const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email already taken",
      });
    }
    User.findOne({ username: req.body.username }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Username already taken",
        });
      }
      const { username, email, password, confirmPassword } = req.body;

      let newUser = new User({
        username,
        email,
        password,
        confirmPassword,
      });
      newUser.save((err, success) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json({
          message: "Signup success! Please Login!",
        });
      });
    });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email doesn't exist, please signup",
      });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    //generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      expiresIn: "1d",
      path: "/",
      domain: "localhost",
    });
    const { _id, username, email } = user;

    return res.json({
      token,
      user: { _id, username, email },
    });
  });
};

export const signout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    domain: "localhost",
  });
  res.json({
    message: "Signout sucess",
  });
};

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "user",
});
