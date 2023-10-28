const db = require("../../models");
const Course = db.course;

// create Course for course
exports.createCourse = async (req, res) => {
  const course = new Course({
    courseTitle: req.body.courseTitle,
    courseDescription: req.body.courseDescription,
    courseContent: req.body.courseContent,
    categories: req.body.categories,
  });

  try {
    const data = await course.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new Course",
    });
  }
};

// update article
exports.updateCourse = async (req, res) => {
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
        message: `Cannot update article with id=${id}. Maybe Course was not found`,
      });
    }

    res.send({ message: "Course was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating Course with id=" + id });
  }
};

// Delete Course by id
exports.deleteCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Course.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
      });
    }

    res.send({ message: "Course was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Course with id=" + id });
  }
};

// find article
exports.getCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: `No Course with id ${id}` });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving Course with id ${id}` });
  }
};

//find all article
exports.getAllCourses = async (req, res) => {
  try {
    const data = await Course.find();
    let category = request.query.category;
    let courses;

    if (data.length === 0) {
      res.status(404).send({ message: "No Course found." });
    } else if (category) {
      courses = await Course.find({ categories: category });
      response.status(200).json(courses);
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving Course",
    });
  }
};
