const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './ex1/bd.sqlite'
});

module.exports = sequelize;