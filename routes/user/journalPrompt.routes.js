const journalPrompts = require("../../controllers/user/journalPrompt.controller");
const { authJWT } = require("../../middlewares");

module.exports = (app) => {
  let router = require("express").Router();

  // Create a new journal prompt
  router.post("/", [authJWT.verifyToken, authJWT.isUser], journalPrompts.create);

  // Get list of all journal prompts or journal prompt with condition
  router.get("/", [authJWT.verifyToken, authJWT.isUser], journalPrompts.findAll);

  // Get journal prompt by id
  router.get("/:id", [authJWT.verifyToken, authJWT.isUser], journalPrompts.findOne);

  // Update journal prompt by id
  router.put("/:id", [authJWT.verifyToken, authJWT.isUser], journalPrompts.update);

  // Delete journal prompt by id
  router.delete("/:id", [authJWT.verifyToken, authJWT.isUser], journalPrompts.delete);

  // Error handling for authentication failure
  router.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next(err);
  });

  app.use("/api/user/journalprompts", router);
};
