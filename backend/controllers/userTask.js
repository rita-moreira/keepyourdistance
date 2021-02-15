import UserTask from "../models/userTask.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const accept = (req, res) => {
  const { _id, token } = req.body;

  Task.findOne({ _id }).exec((err, taskFromDB) => {
    if (err || !taskFromDB) {
      return res.status(400).json({
        error: "Task not found",
      });
    }
    const { title, description, date, postedBy } = taskFromDB;
    UserTask.findOne({ title: title, acceptedBy: req.user }).exec(
      (err, userTask) => {
        if (err || userTask) {
          return res.status(400).json({
            error: "Task already accepted",
          });
        }

        let newAcceptedtask = new UserTask({
          title,
          description,
          date,
          postedBy,
        });
        newAcceptedtask.acceptedBy = req.user._id;
        newAcceptedtask.completed = "false";

        newAcceptedtask.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          res.json({
            message: "Task accepted with success.",
          });
        });
      }
    );
  });
};

export const remove = (req, res) => {
  const title = req.params.title;

  UserTask.findOneAndRemove({ title, acceptedBy: req.user }).exec(
    (err, data) => {
      if (err) {
        console.log(err);

        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "UserTask Accepted deleted successfully",
      });
    }
  );
};

export const update = (req, res) => {
  if (!req.body) {
    return status(400).send({
      message: "Data to upload can not be empty!",
    });
  }

  const id = req.body._id;

  UserTask.findByIdAndUpdate(id, req.body, { new: true }).exec((err, data) => {
    if (err || !data) {
      res.status(400).send({
        message: "Cannot complete UserTask",
      });
    }
    console.log(data);

    const { _id, title, description, share, comment, completed } = data;

    return res.json({
      task: { _id, title, description, share, comment, completed },
    });
  });
};

// tasks list

export const list = (req, res) => {
  UserTask.find({})
    .populate("postedBy", "_id  username photo country")
    .populate("acceptedBy", "_id  username photo country")
    .populate("comments.addedBy", "_id  username photo")
    .select("_id title description completed comment share updatedAt comments ")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

// comments

export const comment = (req, res) => {
  const { comment, token, task_id } = req.body;
  const comentario = { text: comment, addedBy: req.user._id };
  UserTask.findByIdAndUpdate(
    task_id,
    {
      $push: { comments: comentario },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        error: err,
      });
    }
    res.json({
      message: result,
    });
  });
};
