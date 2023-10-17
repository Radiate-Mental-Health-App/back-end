const db = require("../../models");
const MoodEntry = db.moodEntries;
// const { validateMoodEntry } = require("../../middlewares/validateMoodEntry");

// Create and save a new mood entry
exports.create = async (req, res) => {
  //   // Validate the request body using the validateMoodEntry middleware
  //   const validationResult = validateMoodEntry(req);

  //   // Check if validation failed
  //   if (!validationResult.success) {
  //     return res.status(400).json(validationResult);
  //   }

  // Create a new mood entry
  const moodEntry = new MoodEntry({
    moodValue: req.body.moodValue,
    social: req.body.social,
    activities: req.body.activities,
    moodNote: req.body.moodNote,
    //date: req.body.date,
  });

  try {
    const data = await moodEntry.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating a new mood entry",
    });
  }
};

// Get a list of all mood entries
exports.findAll = async (req, res) => {
  try {
    const data = await MoodEntry.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "No mood entries found." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving mood entries.",
    });
  }
};

// Get mood entry by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const moodEntry = await MoodEntry.findById(id);

    if (!moodEntry) {
      return res.status(404).json({ message: `No mood entry found with id ${id}` });
    }

    res.json(moodEntry);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving mood entry with id ${id}` });
  }
};

// Update mood entry by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const data = await MoodEntry.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    if (!data) {
      return res.status(404).send({ message: `Cannot update MoodEntry with id=${id}. Maybe MoodEntry was not found` });
    }

    res.send({ message: "MoodEntry was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating MoodEntry with id=" + id });
  }
};

// Delete mood entry by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await MoodEntry.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({ message: `Cannot delete MoodEntry with id=${id}. Maybe MoodEntry was not found!` });
    }

    res.send({ message: "MoodEntry was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete MoodEntry with id=" + id });
  }
};
