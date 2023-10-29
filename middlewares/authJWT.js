// check if token is provided, legal or not
// check if roles of the account contains required role or not

const JWT = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Admin = db.admin;
const Psychologist = db.psychologist;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  JWT.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
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

    const admin = await Admin.findById(decodedToken.id).exec();

    console.log("Admin: ", admin);

    if (!admin) {
      return res.status(404).send({ message: "Admin not found." });
    }

    const role = await Role.find({ _id: { $in: admin.role } }).exec();

    let isAdminRole = false;
    console.log("Admin Role:", admin.role);
    for (let i = 0; i < role.length; i++) {
      console.log("Role ID", role[i]._id);
      if (role[i].name === "admin") {
        isAdminRole = true;
        break;
      }
    }

    console.log("Role from DB", role);
    console.log("Is Admin Role:", isAdminRole);

    if (isAdminRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message || "An error occurred while checking admin status." });
  }
};

const isPsychologist = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decodedToken = JWT.decode(token);
    req.decoded = decodedToken; // Set the decoded token in req.decoded

    console.log("Decoded Token:", req.decoded); // Log the decoded token for inspection
    console.log("Psychologist Middleware - Checking Access");
    console.log("Decoded Token:", decodedToken);

    const psychologist = await Psychologist.findById(decodedToken.id).exec();

    console.log("Psychologist:", psychologist);

    if (!psychologist) {
      return res.status(404).send({ message: "Psychologist not found." });
    }

    const role = await Role.find({ _id: { $in: psychologist.role } }).exec();

    let isPsychologistRole = false;
    console.log("Psychologist Role:", psychologist.role);
    for (let i = 0; i < role.length; i++) {
      console.log("Role ID:", role[i]._id);
      if (role[i].name === "psychologist") {
        isPsychologistRole = true;
        break;
      }
    }

    console.log("Roles from DB:", role);
    console.log("Is Psychologist Role:", isPsychologistRole);

    if (isPsychologistRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Psychologist Role!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message || "An error occurred while checking psychologist status." });
  }
};

const authJWT = {
  verifyToken,
  isAdmin,
  isPsychologist,
};

module.exports = authJWT;
