const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin.model");
db.appoinment = require("./appoinment.model");
db.counselingResult = require("./counselingResult.model");
db.course = require("./course.model");
db.journalEntries = require("./journalEntry.model");
db.journalPrompts = require("./journalPrompt.model");
db.moodEntries = require("./moodEntry.model");
db.psychologist = require("./psychologist.model");
db.role = require("./role.model");
db.schedule = require("./schedule.model");
db.selfAssessmentResult = require("./selfAssessmentResult.model");
db.selfAssessmentType = require("./selfAssessmentType.model");
db.user = require("./user.model");
db.userCourseProgress = require("./userCourseProgress.model");
db.post = require("./postCourse.model");
db.comment = require("./commentCourse.model");
db.category = require("./category.model");
db.qna = require("./qna.model");

db.ROLES = ["user", "psychologist", "admin"];

module.exports = db;
