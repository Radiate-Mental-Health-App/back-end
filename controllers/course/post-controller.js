const db = require("../../models");
const Post = db.post;

// create article for course
exports.createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    picture: req.body.picture,
    email: req.body.email,
    course: req.body.course,
    createdDate: req.body.createdDate,
  });

  try {
    const data = await post.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new article",
    });
  }
};

// update article
exports.updatePost = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const data = await Post.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!data) {
      return res.status(404).send({
        message: `Cannot update article with id=${id}. Maybe article was not found`,
      });
    }

    res.send({ message: "article was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating article with id=" + id });
  }
};

// Delete article Course by id
exports.deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Post.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot delete article with id=${id}. Maybe article was not found!`,
      });
    }

    res.send({ message: "article was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete article with id=" + id });
  }
};

// find article
exports.getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: `No article with id ${id}` });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving article with id ${id}` });
  }
};

//find all article
exports.getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();

    if (data.length === 0) {
      res.status(404).send({ message: "No article found." });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving article",
    });
  }
};
