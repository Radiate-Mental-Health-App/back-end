const db = require("../../models");
const Qna = db.qna;

// create qna of article
exports.addqna = async (req, res) => {
  const qna = new Qna({
    Questions: req.body.Questions,
    Answers: req.body.Answers,
  });

  try {
    const data = await qna.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while creating a new qna",
    });
  }
};

// Get list Qna  of chatbot
exports.getQnas = async (req, res) => {
  try {
    const data = await Qna.find();

    if (data.length === 0) {
      res.status(404).send({ message: "No Qna found." });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving Qna",
    });
  }
};

// delete Qna
exports.deleteQna = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Qna.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Qna with id=${id}. Maybe Qna was not found!`,
      });
    }

    res.send({ message: "Qna was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Qna with id=" + id });
  }
};

// update Qna
exports.updateQna = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const data = await Qna.findByIdAndUpdate(id, req.body, {
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

// find Qna
exports.getQna = async (req, res) => {
  try {
    const id = req.params.id;
    const qna = await Qna.findById(id);

    if (!qna) {
      return res.status(404).json({ message: `No article with id ${id}` });
    }

    res.json(qna);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving article with id ${id}` });
  }
};
