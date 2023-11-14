module.exports = (app) => {
  const { authJWT } = require("../../middlewares");
  const appointment = require("../../controllers/psychologist/appointment.controller");

  let router = require("express").Router();

  // Create a new appointment
  router.post("/", authJWT.verifyToken, appointment.create);

  // Find all appointment
  router.get("/", authJWT.verifyToken, appointment.findAll);

  // Find appointment by id
  router.get("/detail/:id", appointment.findOne);

  // Update appointment status by id
  router.patch("/:id", appointment.updateStatus);

  router.put("/:id", appointment.updateLinkSession);

  // Delete appointment by id
  router.delete("/:id", appointment.delete);

  app.use("/api/appointment", router);
};
