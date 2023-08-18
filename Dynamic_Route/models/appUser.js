const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Users = sequelize.define("appUser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = Users;
