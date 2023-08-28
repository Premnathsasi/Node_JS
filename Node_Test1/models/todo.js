const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Todo = sequelize.define("todoList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
  isCompleted: Sequelize.BOOLEAN,
});

module.exports = Todo;
