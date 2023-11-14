const db = require("../models");
const Psychologist = db.psychologist;
const User = db.user;

// Get all Psychologist
exports.findAllPsychologist = async (req, res) => {
  try {
    const psychologists = await Psychologist.find();
    if (psychologists.length > 0) {
      res.status(200).json({
        message: "Success get all psychologist",
        data: {
          psychologists,
        },
      });
    } else {
      res.status(404).json({
        message: "No psychologist found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting psychologist",
    });
  }
};

// Get one Psychologist
exports.findOnePsychologist = async (req, res) => {
  try {
    const id = req.params.id;
    const psychologist = await Psychologist.findById(id);
    if (psychologist) {
      res.status(200).json({
        message: "Success get psychologist",
        data: {
          psychologist,
        },
      });
    } else {
      res.status(404).json({
        message: `No psychologist with id ${id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error getting psychologist with id ${id}`,
    });
  }
};

// Get all User
exports.findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({
        message: "Success get all user",
        data: {
          users,
        },
      });
    } else {
      res.status(404).json({
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occured while getting user",
    });
  }
};

// Get one User
exports.findOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        message: "Success get user",
        data: {
          user,
        },
      });
    } else {
      res.status(404).json({
        message: `No user with id ${id}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error getting user with id ${id}`,
    });
  }
};

// update psychologist
exports.updatePsychologist = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const psychologist = await Psychologist.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!psychologist) {
      return res.status(404).send({
        message: `Cannot update psychologist with id=${id}`,
      });
    }

    res.send({ message: "Psychologist was updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating psychologist with id=" + id });
  }
};

// update user
exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!user) {
      return res.status(404).send({
        message: `Cannot update user with id=${id}`,
      });
    }

    res.send({ message: "User was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating user with id=" + id });
  }
};

// Delete psychologist by id
exports.deletePsychologist = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Psychologist.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).json({
        message: `Cannot delete psychologist with id=${id}`,
      });
    }

    res.json({ message: "Psychologist was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not delete psychologist with id=" + id });
  }
};

// Delete psychologist by id
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).json({
        message: `Cannot delete user with id=${id}`,
      });
    }

    res.json({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete user with id=" + id });
  }
};

exports.activatedPyschologist = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Psychologist.findByIdAndUpdate(
      id,
      { isVerified: req.body.status },
      { useFindAndModify: false }
    );

    if (!data) {
      return res.status(404).json({
        message: `Cannot delete psychologist with id=${id}`,
      });
    }

    res.json({ message: "Success activated psychologist account!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not delete psychologist with id=" + id });
  }
};
