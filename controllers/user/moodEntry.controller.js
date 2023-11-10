const db = require("../../models");
const MoodEntry = db.moodEntries;
const User = require("../../models/user.model");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// Create and save a new mood entry
exports.create = async (req, res) => {
  // Create a new mood entry
  const moodEntry = new MoodEntry({
    moodValue: req.body.moodValue,
    social: req.body.social,
    activities: req.body.activities,
    moodNote: req.body.moodNote,
    date: req.body.date,
  });

  try {
    const data = await moodEntry.save();

    // After saving the moodEntry, you need to update the user's moodEntries field.
    const user = req.user;
    console.log("User Object:", user);

    if (!user) {
      return res.status(403).json({ message: "User not found." });
    }

    // Push the new moodEntry to the user's moodEntries array.
    user.moodEntries.push(data._id);

    try {
      // Save the user document to update the moodEntries field.
      await user.save();
    } catch (err) {
      console.error(err); // Log the error to help diagnose the issue
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the user's moodEntries field",
      });
    }

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error(err);
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
  const id = req.params.id;
  try {
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

exports.lineChart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all mood entries for the user without population
    const user = await User.findById(userId).populate("moodEntries");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract mood entries from the user object
    const moodEntries = user.moodEntries;

    // Ensure that there are mood entries
    if (!moodEntries || moodEntries.length === 0) {
      return res.status(404).json({ message: "No mood entries found for the user." });
    }

    // Format the data for the chart
    const chartData = moodEntries.map((entry) => ({
      date: entry.date,
      moodValue: entry.moodValue,
    }));

    res.json({ success: true, chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching chart data." });
  }
};

// Function to get data for the bar chart
exports.barChart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use Mongoose's populate method to fetch all mood entries associated with the user
    const user = await User.findById(userId).populate("moodEntries");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract mood entries from the user object
    const moodEntries = user.moodEntries;

    // Use MongoDB aggregation to group mood entries by moodValue and count
    const result = await MoodEntry.aggregate([
      {
        $match: {
          _id: { $in: moodEntries.map((entry) => entry._id) }, // Filter by mood entry IDs
        },
      },
      {
        $group: {
          _id: "$moodValue", // Group by moodValue field
          count: { $sum: 1 }, // Count the entries in each category
        },
      },
    ]);

    // Format the data for the chart
    const chartData = result.map((entry) => ({
      moodValue: entry._id,
      count: entry.count,
    }));

    res.json({ success: true, chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching bar chart data." });
  }
};
