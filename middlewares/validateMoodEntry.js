const { body, validationResult } = require("express-validator");

const validateMoodEntry = [
  body("moodValue").isIn(["Terrible", "Sad", "Okay", "Good", "Wonderful"]).withMessage(" mood value"),
  body("social").isArray().withMessage("Social must be an array"),
  body("activities").isArray().withMessage("Activities must be an array"),
  body("moodNote").isString().withMessage("Mood note must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = {
  validateMoodEntry,
};
