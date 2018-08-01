/**
 * Sequelize initialization module
 */
var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize('nodejs', 'root', 'mysqlpassword', {
    dialect: 'mysql',
    host: "mysqlinstance.cimzkmhrfaxk.us-east-2.rds.amazonaws.com",
    port: 3306,
    operatorsAliases: "false",
  })
};

// Insert models below
db.Employee = db.sequelize.import('../apicrud/employee/employee.model');

module.exports = db;
