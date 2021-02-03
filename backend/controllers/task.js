import Task from "../models/task.js";

export const create = (req, res) => {
  const { title, description, currentTime, token } = req.body;
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
};

// tasks list

export const list = (req, res) => {
  console.log(req.body);
  Task.find({})
    .populate("postedBy", "_id name username profile")
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
