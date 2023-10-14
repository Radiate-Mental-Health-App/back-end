const { authJWT } = require("../middlewares");
const controller = require("../controllers/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/all", controller.allAccess);
  app.get("/api/user", [authJWT.verifyToken], controller.userBoard);
  app.get("/api/admin", [authJWT.verifyToken, authJWT.isAdmin], controller.adminBoard);
  app.get("/api/psychologist", [authJWT.verifyToken, authJWT.isPsychologist], controller.psychologistBoard);
};
