module.exports = (app) => {
  const { authJWT } = require("../../middlewares");
  const schedule = require("../../controllers/psychologist/schedule.controller");

  let router = require("express").Router();

  // Create a new schedule
  router.post(
    "/",
    [authJWT.verifyToken, authJWT.isPsychologist],
    schedule.create
  );

  // Find all schedule by psychologist id
  router.get("/:id", schedule.findAll);

  // Find schedule by id
  router.get("/detail/:id", schedule.findOne);

  // Update schedule by id
  router.put("/:id", schedule.update);

  // Delete schedule by id
  router.delete("/:id", schedule.delete);

  app.use("/api/psychologist/schedule", router);
};
