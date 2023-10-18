//   sign up : create new account (admin/psychologist/user) in database (role is user if not specifying role)
//   login :
//   - find email of the request in database, if it exists
//   - compare password with password in db using bcrypt, if it is coorect
//   - generate a token using jsonwebtoken
//   - return user information & access token

const config = require("../config/auth.config");
const db = require("../models");
const Role = db.role;
const User = db.user;
const Psychologist = db.psychologist;
const Admin = db.admin;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Determine the role based on the request or default to "user"
    const roles = req.body.roles ? req.body.roles : ["user"];

    // Validate and hash the password securely
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Increase the number of rounds for more security

    // Create an array to hold the account instances
    const accounts = [];

      let account;

      switch (roles) {
        case "user":
          account = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            password: hashedPassword,
          });
          break;
        case "psychologist":
          account = new Psychologist({
            email: req.body.email,
            fullName: req.body.fullName,
            password: hashedPassword,
          });
          break;
        case "admin":
          account = new Admin({
            email: req.body.email,
            password: hashedPassword,
          });
          break;
        default:
          return res.status(400).send({ message: "Invalid role specified" });
      }

      accounts.push(account);

    // Assign roles to each account
    const accountRole = await Role.find({ name: { $in: roles } });
    console.log("accountRole:", accountRole);

    for (let i = 0; i < accounts.length; i++) {
      accounts[i].role = [accountRole[i]._id];
      await accounts[i].save();
    }

    // After assigning roles to the psychologist
    console.log("Assigned roles to psychologist:", roles);

    // Respond with success message
    res.status(200).send({ message: "Account was registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message || "An error occurred while registering the user." });
  }
};

exports.signin = async (req, res) => {
  try {
    // Find the account by email in each role model
    const userAccount = await User.findOne({ email: req.body.email }).populate("role", "-__").exec();
    const psychologistAccount = await Psychologist.findOne({ email: req.body.email }).populate("role", "-__").exec();
    const adminAccount = await Admin.findOne({ email: req.body.email }).populate("role", "-__").exec();

    // Determine the role based on which account was found
    let account;
    if (userAccount) {
      account = userAccount;
    } else if (psychologistAccount) {
      account = psychologistAccount;
    } else if (adminAccount) {
      account = adminAccount;
    } else {
      return res.status(404).send({ message: "Account non found!" });
    }

    // Check if the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.password, account.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid password!" });
    }

    // Get user roles
    const authorities = "ROLE_" + account.role.name.toUpperCase();

    // Generate a JWT token
    const token = JWT.sign({ id: account.id, roles: authorities }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // Respond with user information and token
    res.status(200).send({
      id: account._id,
      email: account.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message || "An error occured while signing in." });
  }
};
