module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE       
      },
      updated_at: {
        type: Sequelize.DATE       
      },
      id_groupes: {
        type: Sequelize.INTEGER       
      }
    });
    return User;
  };