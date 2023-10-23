module.exports = (app) => {
  const course = require("../../controllers/course/post-controller.js");
  // const image = require("../../controllers/course/image-controller.js");
  const comment = require("../../controllers/course/comment-controller.js");

  let router = require("express").Router();

  // Create a artikel of course
  router.post("/createpost/", course.createPost);

  // update artikel
  router.put("/updatepost/:id", course.updatePost);

  // delete artikel
  router.delete("/deletepost/:id", course.deletePost);

  // get one artikel by course
  router.get("/post/:id", course.getPost);

  // get all artikel by course
  router.get("/posts/", course.getAllPosts);

  // Create a image of artikel course
  // router.post("/course/post/file/upload", image.uploadImage);

  // get all artikel by course
  // router.get("/course/post/file/:filename", image.getImage);

  // Create a comment of artikel
  router.post("/posts/comment/new", comment.newComment);

  // update artikel
  router.get("/posts/comment/:id", comment.getComments);

  // delete artikel
  router.delete("/posts/comment/delete/:id", comment.deleteComment);

  app.use("/api/course", router);
};
