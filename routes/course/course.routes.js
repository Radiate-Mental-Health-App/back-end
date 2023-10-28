module.exports = (app) => {
  const coursePost = require("../../controllers/course/post-controller.js");
  // const image = require("../../controllers/course/image-controller.js");
  const comment = require("../../controllers/course/comment-controller.js");
  const course = require("../../controllers/course/comment-controller.js");

  let router = require("express").Router();

  // Create a artikel of course
  router.post("/createpost/", coursePost.createPost);

  // update artikel
  router.put("/updatepost/:id", coursePost.updatePost);

  // delete artikel
  router.delete("/deletepost/:id", coursePost.deletePost);

  // get one artikel by course
  router.get("/post/:id", coursePost.getPost);

  // get all artikel by course
  router.get("/posts/", coursePost.getAllPosts);

  // Create a course
  router.post("/createcourse/", course.createcourse);

  // update course
  router.put("/updatecourse/:id", course.updatecourse);

  // delete course
  router.delete("/deletecourse/:id", course.deletecourse);

  // get one  course
  router.get("/getcourse/:id", course.getcourse);

  // get all course
  router.get("/getAllcourses/", course.getAllcourses);

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
