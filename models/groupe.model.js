module.exports = (sequelize, Sequelize) => {
    const Groupe = sequelize.define("groupes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Groupe;
  };