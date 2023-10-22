const db = require("../../models");
const Comment = db.comment;

// create comment of article
exports.newComment = async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    postId: req.body.postId,
    date: req.body.date,
    comments: req.body.comments,
  });

  try {
    const data = await comment.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new comment",
    });
  }
};

// Get list comment  of article
exports.getComments = async (req, res) => {
  try {
    const data = await Comment.find({ postId: req.params.id });

    if (data.length === 0) {
      res.status(404).send({ message: "No Comment found." });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving Comments",
    });
  }
};

// delete comment
exports.deleteComment = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Comment.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
      });
    }

    res.send({ message: "Comment was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Comment with id=" + id });
  }
};
