const db = require("../models");
const Groupe = db.groupe;
const User = db.user;

exports.createGroupe = (groupe) => {
    return Groupe.create({
        name: groupe.name
    })
      .then((groupe) => {
        console.log(">> groupe crée: " + JSON.stringify(groupe, null, 4));
        return groupe;
      })
      .catch((err) => {
        console.log(">> erreur a la creation du groupe: ", err);
      });
  };

  exports.createUser = (groupeId, user) => {
    return User.create({
      name: user.name,
      text: user.text,
      groupeId: groupeId,
    })
      .then((user) => {
        console.log(">> Created user: " + JSON.stringify(comment, null, 4));
        return user;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };

  exports.findGroupeById = (groupeId) => {
    return Groupe.findByPk(groupeId, { include: ["users"] })
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
        console.log(">> Error while finding user: ", err);
      });
  };

  exports.findAll = () => {
    return Groupe.findAll({
      include: ["users"],
    }).then((Groupes) => {
      return Groupes;
    });
  };
