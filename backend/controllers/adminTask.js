import AdminTask from "../models/adminTask.js";

export const complete = (req, res) => {
  const { token, title, description, comment, share } = req.body;

  let newCompletedtask = new AdminTask({
    title,
    description,
    comment,
    share,
  });
  newCompletedtask.completedBy = req.user._id;

  newCompletedtask.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Task completed with success.",
    });
  });
};

// tasks list

export const list = (req, res) => {
  AdminTask.find({})
    .populate("completedBy", "_id  username photo country")
    .select("_id title description comment share createdAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};
