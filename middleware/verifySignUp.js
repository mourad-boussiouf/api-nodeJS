const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Groupes = db.groupe;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Nom d'utilisateur déjâ existant"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "adresse Email déjâ existante"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

checkGroupesExisted = (req, res, next) => {
  if (req.body.groupe) {
    for (let i = 0; i < req.body.groupe.length; i++) {
      if (!Groupes.includes(req.body.groupe[i])) {
        res.status(400).send({
          message: "Failed! Groupe does not exist = " + req.body.groupe[i]
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkGroupesExisted: checkGroupesExisted
};

module.exports = verifySignUp;