const db = require("../models");
const Groupe = db.groupe;
const User = db.user;

exports.createGroupe = (groupe) => {
    return Groupe.create({
        name: groupe.name
    })
      .then((tutorial) => {
        console.log(">> groupe crée: " + JSON.stringify(groupe, null, 4));
        return groupe;
      })
      .catch((err) => {
        console.log(">> erreur a la creation du groupe: ", err);
      });
  };


  exports.createUser = (groupeId, user) => {
    return User.create({
      name: comment.name,
      text: comment.text,
      tutorialId: tutorialId,
    })
      .then((comment) => {
        console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };

  exports.findGroupeById = (groupeId) => {
    return Groupe.findByPk(groupeId, { include: ["comments"] })
      .then((groupe) => {
        return groupe;
      })
      .catch((err) => {
        console.log(">> erreur en cherchant ce groupe: ", err);
      });
  };

  exports.findUserById = (id) => {
    return User.findByPk(id, { include: ["groupe"] })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
      });
  };