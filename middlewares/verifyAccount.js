// check duplication for email
// check if roles in the request is legal or not

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Psychologist = db.psychologist;
const Admin = db.admin;

checkDuplicateEmail = async (req, res, next) => {
  try {
    const accountModel = [User, Psychologist, Admin];

    // check for duplicate email
    for (const Account of accountModel) {
      const emailAccount = await Account.findOne({
        email: req.body.email,
      }).exec();
      if (emailAccount) {
        return res
          .status(400)
          .send({ message: `Failed to Register: Email is already in use!` });
      }
    }

    // if email is not in use for any account, continue to the next middleware
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    let roleExist = null;
    for (let i = 0; i < ROLES.length; i++) {
      if (ROLES[i] == req.body.roles) {
        roleExist = true;
      }
    }

    if (!roleExist) {
      return res.status(400).send({
        message: `Failed! Role ${req.body.roles} does not exist!`,
      });
    }
  }
  next();
};

const verifyAccount = {
  checkDuplicateEmail,
  checkRoleExisted,
};

module.exports = verifyAccount;
