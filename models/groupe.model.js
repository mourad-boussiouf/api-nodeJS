module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("groupes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Role;
  };