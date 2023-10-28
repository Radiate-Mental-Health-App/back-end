const express = require("express");
const cors = require("cors");

const dbConfig = require("./config/db.config");

const app = express();

const db = require("./models");
const Role = db.role;

var consOption = {
  origin: "http://localhost:8001",
};

app.use(cors(consOption));

// parse request of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// initialize mongoose
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB");
    initial();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit();
  });

// route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Radiate: mental health app!" });
});
require("./routes/auth.routes")(app);
require("./routes/role.routes")(app);
require("./routes/user/moodEntry.routes")(app);
require("./routes/user/journalPrompt.routes")(app);
require("./routes/user/journalEntry.routes")(app);
require("./routes/course/course.routes")(app);
require("./routes/Qna/qna.routes")(app);

// port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// initialize a collection of roles, role-based access control
async function initial() {
  try {
    const count = await Role.collection.estimatedDocumentCount();

    if (count === 0) {
      const userRole = new Role({
        name: "user",
      });

      const psychologistRole = new Role({
        name: "psychologist",
      });

      const adminRole = new Role({
        name: "admin",
      });

      await userRole.save();
      console.log("Added 'user' to role collection");

      await psychologistRole.save();
      console.log("Added 'psychologist' to role collection");

      await adminRole.save();
      console.log("Added 'admin' to role collection");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
}
