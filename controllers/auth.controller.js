const db = require("../models");
GROUPES = ["salades", "tomates", "oignons"];
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if(!GROUPES.includes(req.body.groupeId)){req.body.groupeId = null}
  switch(req.body.groupeId){
    case "salades":
      req.body.groupeId = 1;
      break;
    case "tomates":
      req.body.groupeId = 2;
      break;
    case "oignons":
      req.body.groupeId = 3;
      break;
  }

  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    groupeId: req.body.groupeId
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Utilisateur bien enregistre!" });
          });
        });
      } else {
        // user role de base = id 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Utilisateur bien enregistre!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "utilisateur introuvable" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "mdp invalide"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 //24heures
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
