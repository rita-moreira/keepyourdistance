import UserTask from "../models/userTask.js";
import Task from "../models/task.js";

export const accept = (req, res) => {
  const { _id, token } = req.body;

  Task.findOne({ _id }).exec((err, taskFromDB) => {
    if (err || !taskFromDB) {
      return res.status(400).json({
        error: "Task not found",
      });
    }
    const { title, description, date, postedBy } = taskFromDB;
    UserTask.findOne({ title: title }).exec((err, userTask) => {
      if (userTask) {
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
    });
  });
};

export const remove = (req, res) => {
  const _id = req.params._id;
  UserTask.findOneAndRemove(_id).exec((err, data) => {
    if (err) {
      consle.log(err);

      return res.json({
        error: err,
      });
    }
    res.json({
      message: "UserTask Accepted deleted successfully",
    });
  });
};
