const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin.model");
db.appoinment = require("./appoinment.model");
db.counselingResult = require("./counselingResult.model");
db.course = require("./course.model");
db.journalEntry = require("./journalEntry.model");
db.journalPrompt = require("./journalPrompt.model");
db.moodEntry = require("./moodEntry.model");
db.psychologist = require("./psychologist.model");
db.role = require("./role.model");
db.schedule = require("./schedule.model");
db.selfAssessmentResult = require("./selfAssessmentResult.model");
db.selfAssessmentType = require("./selfAssessmentType.model");
db.user = require("./user.model");
db.userCourseProgress = require("./userCourseProgress.model");

db.ROLES = ["user", "psychologist", "admin"];

module.exports = db;
