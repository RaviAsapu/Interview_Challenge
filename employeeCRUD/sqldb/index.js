/**
 * Sequelize initialization module
 */
var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize('nodejs', 'root', 'root', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    operatorsAliases: "false",
  })
};

// Insert models below
db.Employee = db.sequelize.import('../api/employee/employee.model');

module.exports = db;
