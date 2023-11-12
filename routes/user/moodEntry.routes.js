module.exports = (app) => {
const moodEntries = require("../../controllers/user/moodEntry.controller");
const { authJWT } = require("../../middlewares");

module.exports = (app) => {
  let router = require("express").Router();

  // Create a new mood entry
  router.post("/", [authJWT.verifyToken, authJWT.isUser], moodEntries.create);

  // Get mood tracking line chart
  router.get("/linechart", [authJWT.verifyToken, authJWT.isUser], moodEntries.lineChart);

  // Get mood tracking bar chart
  router.get("/barchart", [authJWT.verifyToken, authJWT.isUser], moodEntries.barChart);

  // Find all mood entries
  router.get("/", [authJWT.verifyToken, authJWT.isUser], moodEntries.findAll);

  // Find mood entry by id
  router.get("/:id", [authJWT.verifyToken, authJWT.isUser], moodEntries.findOne);

  // Update mood entry by id
  router.put("/:id", [authJWT.verifyToken, authJWT.isUser], moodEntries.update);

  // Delete mood entry by id
  router.delete("/:id", [authJWT.verifyToken, authJWT.isUser], moodEntries.delete);

  // Error handling for authentication failure
  router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next(err);
  });

  app.use("/api/user/moodentries", router);
};
