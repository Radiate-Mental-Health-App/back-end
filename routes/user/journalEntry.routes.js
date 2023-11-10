const journalEntries = require("../../controllers/user/journalEntry.controller");
const { authJWT } = require("../../middlewares");

module.exports = (app) => {
  let router = require("express").Router();

  // Create a new journal entry
  router.post("/", [authJWT.verifyToken, authJWT.isUser], journalEntries.create);

  // Get list of all journal entries or journal entry with condition
  router.get("/", [authJWT.verifyToken, authJWT.isUser], journalEntries.findAll);

  // Get journal entry by id
  router.get("/:id", [authJWT.verifyToken, authJWT.isUser], journalEntries.findOne);

  // Update journal entry by id
  router.put("/:id", [authJWT.verifyToken, authJWT.isUser], journalEntries.update);

  // Delete journal entry by id
  router.delete("/:id", [authJWT.verifyToken, authJWT.isUser], journalEntries.delete);

  // Error handling for authentication failure
  router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next(err);
  });

  app.use("/api/user/journalentries", router);
};
