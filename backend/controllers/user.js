import User from "../models/user.js";
import Task from "../models/task.js";
import jwt from "jsonwebtoken";
import multer from "multer";
export const profile = (req, res) => {
  let username = req.params.username;

  // find user by his username
  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    let user = userFromDB;
    let userId = user._id;

    // find tasks created by that user
    Task.find({ postedBy: userId })
      .populate("postebBy", "_id username")
      .limit(10)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "An error occurr",
          });
        }
        res.json({
          user,
          tasks: data,
        });
      });
  });
};

export const update = (req, res) => {
  if (!req.body) {
    return status(400).send({
      message: "Data to upload can not be empty!",
    });
  }
  console.log(req.body.photo.filename);
  const id = req.body._id;
  console.log(req.body.photo);
  User.findByIdAndUpdate(id, req.body, { new: true }).exec((err, user) => {
    if (err || !user) {
      res.status(400).send({
        message: "Cannot update User",
      });
    }

    //generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, email, country, description, photo } = user;

    return res.json({
      token,
      user: { _id, username, email, country, description, photo },
    });
  });
};
