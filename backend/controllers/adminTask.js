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
    .populate("comments.postedBy", "_id  username photo ")
    .select("_id title description comment share createdAt comments")
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) {
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
  const comentario = { text: comment, postedBy: req.user._id };
  AdminTask.findByIdAndUpdate(
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
