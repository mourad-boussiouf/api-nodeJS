const db = require("../models");
GROUPES = ["salades", "tomates", "oignons"];
const config = require("../config/auth.config");
const User = db.user;
const Groupe = db.groupe;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("OUVERT A TOUS SANS TOKEN");
};

exports.listeNoms = (req, res) => {
   User.findAll({
    attributes: ['firstname', 'lastname']
  }).then(user => {
      return res.status(200).send({user});
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.listeGroupes = (req, res) => {
  Groupe.findAll({
   attributes: ['name']
 }).then(groupe => {
     return res.status(200).send({groupe});
 }).catch(err => {
   res.status(500).send({ message: err.message });
 });
}

exports.listeGroupesEtNoms =  (req, res) => {
  User.findAll({
    attributes: ['groupeId', 'firstname', 'lastname']
  }).then(user => {
      return res.status(200).send({user});    
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.userBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENT AUX UTILISATEURS AVEC TOKEN USER.");
};

exports.userBoardFind = (req, res) => {
  User.findAll({
    attributes: ['groupeId', 'firstname', 'lastname']
  }).then(user => {
      return res.status(200).send({user});    
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENT AUX ADMINS AVEC TOKEN ADMIN.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MODOS AVEC TOKEN MODO");
};

exports.saladesBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MEMBRES DU GROUPE SALADES");
};

exports.tomatesBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MEMBRES DU GROUPE TOMATES");
};

exports.oignonsBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MEMBRES DU GROUPE OIGNONS");
};