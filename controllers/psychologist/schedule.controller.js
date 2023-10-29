const db = require("../../models");
const Schedule = db.schedule;

// Create and save a new schedule
exports.create = async (req, res) => {
  const psychologistId = req.decoded.id;
  const { date, timeSlots } = req.body;

  try {
    const newSchedule = new Schedule({
      psychologistId: psychologistId,
      date: date,
      timeSlots: timeSlots,
      isBooked: false,
    });

    await newSchedule.save();

    res.status(201).json({ success: true, newSchedule });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "An error occurred while creating a new schedule",
    });
  }
};

// Get a list of all schedule by Psychologist
exports.findAll = async (req, res) => {
  try {
    const schedules = await Schedule.find({ psychologistId: req.params.id });

    if (schedules.length <= 0) {
      return res.status(404).json({ message: "No schedules found" });
    }

    res.status(200).json({
      message: "Success get all schedules",
      data: {
        schedules,
      },
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "An error occurred while retrieving schedules",
    });
  }
};

// Get schedule by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return res
        .status(404)
        .json({ message: `No schedule found with id ${id}` });
    }

    res.json(schedule);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving schedule with id ${id}` });
  }
};

// Update schedule by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!schedule) {
      return res.status(404).send({
        message: `Cannot update schedule with id=${id}`,
      });
    }

    res.send({ message: "Schedule was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating schedule with id=" + id });
  }
};

// Delete schedule by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const schedule = await Schedule.findByIdAndRemove(id);

    if (!schedule) {
      return res.status(404).send({
        message: `Cannot delete schedule with id=${id}`,
      });
    }

    res.send({ message: "Schedule was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Could not delete schedule with id=" + id });
  }
};
