module.exports = (app) => {
  const journalEntries = require("../../controllers/user/journalEntry.controller");

  let router = require("express").Router();

  // Create a new journal entry
  router.post("/", journalEntries.create);

  // Get list of all journal entries or journal entry with condition
  router.get("/", journalEntries.findAll);

  // Get journal entry by id
  router.get("/:id", journalEntries.findOne);

  // Update journal entry by id
  router.put("/:id", journalEntries.update);

  // Delete journal entry by id
  router.delete("/:id", journalEntries.delete);

  app.use("/api/user/journalentries", router);
};
