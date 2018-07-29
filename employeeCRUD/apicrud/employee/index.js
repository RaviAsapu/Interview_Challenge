var express = require('express');
var controller = require('./employee.controller');
// var auth = require('../../auth/auth.service';

var router = express.Router();

router.get('/', controller.findAllEmployee);
router.get('/:id', controller.findEmployeeById);
router.post('/', controller.createEmployee);
router.delete('/:id', controller.deleteEmployee);
router.put('/:id', controller.updateEmployee);


module.exports = router;
