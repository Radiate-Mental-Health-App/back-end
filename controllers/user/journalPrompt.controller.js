const db = require("../../models");
const JournalPrompt = db.journalPrompts;

// Create a new journal prompt
exports.create = async (req, res) => {
  const journalPrompt = new JournalPrompt({
    question: req.body.question,
  });

  try {
    const data = await journalPrompt.save();

    const user = req.user;

    if (!user) {
      return res.status(403).json({ message: "User not found." });
    }

    user.journalPrompts.push(data._id);
    try {
      await user.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "An error occured while updating the user's journalPrompt field",
      });
    }
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new journal prompt",
    });
  }
};

// Get list of all journal prompts or journal prompt with condition
exports.findAll = async (req, res) => {
  const question = req.query.question;
  let condition = question ? { question: { $regex: new RegExp(question, "i") } } : {};

  try {
    const data = await JournalPrompt.find(condition);

    if (data.length === 0) {
      res.status(404).send({ message: "No question prompt found." });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving journal prompt",
    });
  }
};

// Get journal prompt by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const journalPrompt = await JournalPrompt.findById(id);

    if (!journalPrompt) {
      return res.status(404).json({ message: `No mood journal promt with id ${id}` });
    }

    res.json(journalPrompt);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving journal prompt with id ${id}` });
  }
};

// Update journal prompt by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const data = await JournalPrompt.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    if (!data) {
      return res.status(404).send({ message: `Cannot update Journal Prompt with id=${id}. Maybe Journal Prompt was not found` });
    }

    res.send({ message: "Journal Prompt was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating Journal Prompt with id=" + id });
  }
};

// Delete journal prompt by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await JournalPrompt.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({ message: `Cannot delete JournalPrompt with id=${id}. Maybe JournalPrompt was not found!` });
    }

    res.send({ message: "JournalPrompt was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete JournalPrompt with id=" + id });
  }
};
