const db = require("../../models");
const CounselingResult = db.counselingResult;

// Create and save a new conseling result
exports.create = async (req, res) => {
  const psychologistId = req.decoded.id;
  const {
    userId,
    scheduleId,
    observationResult,
    interviewResult,
    personalityDynamics,
    problems,
    solutionAndAssignment,
    conclusion,
  } = req.body;

  try {
    const newConselingResult = new CounselingResult({
      psychologistId: psychologistId,
      userId: userId,
      scheduleId: scheduleId,
      observationResult: observationResult,
      interviewResult: interviewResult,
      personalityDynamics: personalityDynamics,
      problems: problems,
      solutionAndAssignment: solutionAndAssignment,
      conclusion: conclusion,
    });

    await newConselingResult.save();

    res.status(201).json({ success: true, newConselingResult });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message ||
        "An error occurred while creating a new conseling result",
    });
  }
};

// Get a list of all counseling result
exports.findAll = async (req, res) => {
  try {
    const counselingResults = await CounselingResult.find();

    if (counselingResults.length <= 0) {
      return res.status(404).json({ message: "No counseling results found" });
    }

    res.status(200).json({
      message: "Success get all counseling results",
      data: {
        counselingResults,
      },
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "An error occurred while retrieving counseling results",
    });
  }
};

// Get counseling result by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const counselingResult = await CounselingResult.findById(id);

    if (!counselingResult) {
      return res
        .status(404)
        .json({ message: `No counseling result found with id ${id}` });
    }

    res.json(counselingResult);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving counseling result with id ${id}` });
  }
};

// Update counseling result by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const counselingResult = await CounselingResult.findByIdAndUpdate(
      id,
      req.body,
      {
        useFindAndModify: false,
      }
    );

    if (!counselingResult) {
      return res.status(404).send({
        message: `Cannot update counseling result with id=${id}`,
      });
    }

    res.send({ message: "Counseling Result was updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating counseling result with id=" + id });
  }
};

// Delete counseling result by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const counselingResult = await CounselingResult.findByIdAndRemove(id);

    if (!counselingResult) {
      return res.status(404).send({
        message: `Cannot delete counseling result with id=${id}`,
      });
    }

    res.send({ message: "Counseling Result was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Could not delete counseling result with id=" + id });
  }
};
