module.exports = (app) => {
  const { authJWT } = require("../middlewares");
  const account = require("../controllers/account.controller");

  let router = require("express").Router();

  // Get all account
  router.get("/psychologist", account.findAllPsychologist);
  router.get("/user", account.findAllUser);

  // Get account by id
  router.get("/psychologist/:id", account.findOnePsychologist);
  router.get("/user/:id", account.findOneUser);

  // activated account psychologist
  router.patch(
    "/psychologist/:id/activated",
    [authJWT.verifyToken, authJWT.isAdmin],
    account.activatedPyschologist
  );

  // Delete account by id
  router.delete("/psychologist/:id", account.deletePsychologist);
  router.delete("/user/:id", account.deleteUser);

  app.use("/api/account", router);
};
