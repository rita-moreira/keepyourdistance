import User from "../models/user.js";
import Task from "../models/task.js";
import UserTask from "../models/userTask.js";
import AdminTask from "../models/adminTask.js";
import jwt from "jsonwebtoken";

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
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "An error occurr",
          });
        }

        UserTask.find({ acceptedBy: userId })
          .populate("acceptedBy", "_id username photo")
          .populate("postedBy", "_id username photo")
          .populate("comments.addedBy", "_id username photo")
          .exec((err, data2) => {
            if (err) {
              console.log(err);
              return res.status(400).json({
                error: "An error occurr",
              });
            }

            AdminTask.find({ completedBy: userId })
              .populate("completedBy", "_id username photo")
              .populate("comments.postedBy", "_id  username photo ")
              .sort({ createdAt: -1 })
              .exec((err, data3) => {
                if (err) {
                  return res.status(400).json({
                    error: "An error occurr",
                  });
                }
                res.json({
                  user,
                  tasks: data,
                  userTasks: data2,
                  adminCompletedTasks: data3,
                });
              });
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

  const id = req.body._id;

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

    const {
      _id,
      username,
      email,
      country,
      description,
      photo,
      progress,
    } = user;

    return res.json({
      token,
      user: { _id, username, email, country, description, photo, progress },
    });
  });
};

// tasks list

export const listUsers = (req, res) => {
  User.find({})
    .select("country")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};
