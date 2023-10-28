module.exports = (app) => {
  const qna = require("../../controllers/qna/qna-controller.js");

  let router = require("express").Router();

  // Create a qna of chatbot
  router.post("/addqna/", qna.addqna);

  // update qna
  router.put("/updateQna/:id", qna.updateQna);

  // delete qna
  router.delete("/deleteQna/:id", qna.deleteQna);

  // get one qna by chatbot
  router.get("/getQna/:id", qna.getQna);

  // get all qna by chatbot
  router.get("/getQnas/", qna.getQnas);

  app.use("/api/qna", router);
};
