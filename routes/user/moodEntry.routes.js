module.exports = (app) => {
  const moodEntries = require("../../controllers/user/moodEntry.controller");

  let router = require("express").Router();

  // Create a new mood entry
  router.post("/", moodEntries.create);

  // Find all mood entries
  router.get("/", moodEntries.findAll);

  // Find mood entry by id
  router.get("/:id", moodEntries.findOne);

  // Update mood entry by id
  router.put("/:id", moodEntries.update);

  // Delete mood entry by id
  router.delete("/:id", moodEntries.delete);

  app.use("/api/user/moodentries", router);
};
