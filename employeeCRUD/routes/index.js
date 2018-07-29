module.exports = function (app) {

  // Insert routes below
  app.use('/apicrud/employee', require('../apicrud/employee'));

};