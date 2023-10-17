module.exports = (app) => {
  const journalPrompts = require("../../controllers/user/journalPrompt.controller");

  let router = require("express").Router();

  // Create a new journal prompt
  router.post("/", journalPrompts.create);

  // Get list of all journal prompts or journal prompt with condition
  router.get("/", journalPrompts.findAll);

  // Get journal prompt by id
  router.get("/:id", journalPrompts.findOne);

  // Update journal prompt by id
  router.put("/:id", journalPrompts.update);

  // Delete journal prompt by id
  router.delete("/:id", journalPrompts.delete);

  app.use("/api/user/journalprompts", router);
};
