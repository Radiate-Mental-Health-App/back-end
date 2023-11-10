module.exports = (app) => {
    const { authJWT } = require("../../middlewares");
    const counselRes = require("../../controllers/psychologist/conselingResult.controller");
  
    let router = require("express").Router();
  
    // Create a new appointment
    router.post("/", authJWT.verifyToken, counselRes.create);
  
    // Find all appointment
    router.get("/", counselRes.findAll);
  
    // Find appointment by id
    router.get("/detail/:id", counselRes.findOne);
  
    // Update appointment status by id
    router.put("/:id", counselRes.update);
  
    // Delete appointment by id
    router.delete("/:id", counselRes.delete);
  
    app.use("/api/counselres", router);
  };
  