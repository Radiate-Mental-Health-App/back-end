const db = require("../../models");
const JournalEntry = db.journalEntries;

// Create a new journal entry
exports.create = async (req, res) => {
  const journalEntry = new JournalEntry({
    title: req.body.title,
    journalPrompt: req.body.journalPrompt,
    note: req.body.note,
  });

  try {
    const data = await journalEntry.save();

    // Fetch the created journal entry with populated journalPrompt
    const createdEntry = await JournalEntry.findById(data._id).populate("journalPrompt");

    const user = req.user;

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    user.journalEntries.push(data._id);

    try {
      await user.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while updating the user's journalEntries field",
      });
    }
    res.status(201).json({ success: true, data: createdEntry });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new journal entry",
    });
  }
};

// Get list of all journal entries or journal entry with condition
exports.findAll = async (req, res) => {
  const note = req.query.note;
  let condition = note ? { note: { $regex: new RegExp(note, "i") } } : {};

  try {
    const data = await JournalEntry.find(condition);

    if (data.length === 0) {
      res.status(404).send({ message: "No Journal Entry found." });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving journal Entry",
    });
  }
};

// Get journal entry by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const journalEntry = await JournalEntry.findById(id);

    if (!journalEntry) {
      return res.status(404).json({ message: `No journal entry with id ${id}` });
    }

    res.json(journalEntry);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving journal Entry with id ${id}` });
  }
};

// Update journal entry by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const data = await JournalEntry.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    if (!data) {
      return res.status(404).send({ message: `Cannot update Journal Entry with id=${id}. Maybe Journal Entry was not found` });
    }

    res.send({ message: "Journal Entry was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating Journal Entry with id=" + id });
  }
};

// Delete journal entry by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await JournalEntry.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({ message: `Cannot delete JournalEntry with id=${id}. Maybe JournalEntry was not found!` });
    }

    res.send({ message: "JournalEntry was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete JournalEntry with id=" + id });
  }
};
