import Task from "../models/task.js";

export const create = (req, res) => {
  const { title, description, currentTime, token } = req.body;
  Task.findOne({ title }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Please change the title, already used!",
      });
    }
    let newTask = new Task({
      title,
      description,
      date: currentTime,
    });
    newTask.postedBy = req.user._id;

    newTask.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "Task created with success.",
      });
    });
  });
};

// tasks list

export const list = (req, res) => {
  Task.find({})
    .populate("postedBy", "_id  username photo country")
    .select("_id title description postedBy date")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

export const remove = (req, res) => {
  const title = req.params.title;

  Task.findOneAndRemove({ title }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: "Task created deleted successfully",
    });
  });
};
