const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { WebSocketServer } = require("ws");

const dbConfig = require("./config/db.config");
const db = require("./models");
const MoodEntry = require("./models/moodEntry.model");
const Role = db.role;


const app = express();
const PORT = process.env.PORT || 5000;

var consOption = {
  origin: "*",
};


// CORS configuration
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Radiate: mental health app!" });
});

require("./routes/account.routes")(app);

require("./routes/auth.routes")(app);
require("./routes/role.routes")(app);
require("./routes/user/moodEntry.routes")(app);
require("./routes/user/journalPrompt.routes")(app);
require("./routes/user/journalEntry.routes")(app);
require("./routes/course/course.routes")(app);
require("./routes/Qna/qna.routes")(app);
require("./routes/psychologist/schedule.routes")(app);
require("./routes/psychologist/appointment.routes")(app);
require("./routes/psychologist/counselingResult.routes")(app);

// WebSocket server
const socketServer = new WebSocketServer({ port: 443 });

socketServer.on("connection", (ws) => {
  console.log("New client connected");

  async function getMoodEntries() {
    try {
      const data = await MoodEntry.find({});
      socketServer.clients.forEach((client) => {
        client.send(JSON.stringify(data));
      });
    } catch (err) {
      console.error("Error fetching mood entries", err);
    }
  }


  ws.on("message", (message) => {
    switch (JSON.parse(message).type) {
      case "load":
        getMoodEntries();
        break;
    }
  });
});

// Initialize a collection of roles for role-based access control
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
