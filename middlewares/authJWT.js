const JWT = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  JWT.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      console.log("Token Verification Failed");
      console.error(err);
      return res.status(401).send({ message: "Unauthorized!" });
    }

    // Set the user information in req.user, including roles
    req.user = {
      id: decoded.id,
      roles: decoded.roles, // Include roles in the req.user object
    };

    
    const decodedToken = JWT.decode(token);
    req.decoded = decodedToken;

    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decodedToken = JWT.decode(token);
    req.decoded = decodedToken;

    console.log("Decoded Token: ", req.decoded);
    console.log("Admin Middleware - Checking Access");
    console.log("Decoded Token:", decodedToken);


    // Based on the user's role, conditionally populate moodEntries
    if (req.user.roles === "ROLE_USER") {
      req.user = await db.user.findById(req.user.id).populate("moodEntries", "journalPrompts").exec();
    }

    next();
  });
};

const checkRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      const decodedToken = JWT.decode(token);
      const user = await db[roleName].findById(decodedToken.id).exec();

      if (!user) {
        return res.status(404).send({ message: `${roleName} not found.` });
      }

      const roles = await Role.find({ _id: { $in: user.role } }).exec();

      if (roles.some((role) => role.name === roleName.toLowerCase())) {
        next();
      } else {
        res.status(403).send({ message: `Require ${roleName} Role!` });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: `An error occurred while checking ${roleName} status.` });
    }
  };
};

const authJWT = {
  verifyToken,
  isAdmin: checkRole("admin"),
  isPsychologist: checkRole("psychologist"),
  isUser: checkRole("user"),
};

module.exports = authJWT;
