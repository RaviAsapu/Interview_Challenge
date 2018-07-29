var db = require('../../sqldb');
var Employee = db.Employee;
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function respondWith(res, statusCode) {
    statusCode = statusCode || 200;
    return function () {
        res.status(statusCode).end();
    };
}

/**
 * Creates a new employee
 */
exports.createEmployee = function (req, res, next) {
    var newEmployee = Employee.build(req.body);
    newEmployee.setDataValue('role', 'admin');
    newEmployee.save()
        .then(function (emp) {

            var token = jwt.sign({ id: emp.id }, config.jwt.secret, {
                expiresIn: 60 * 60 * 5
            });

            res.json({ token: token });
        })
        .catch(validationError(res));
};


/**
* Get list of employees
*/
exports.findAllEmployee = function (req, res) {
    Employee.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'role'
        ]
    })
        .then(function (employees) {
            res.status(200).json(employees);
        })
        .catch(handleError(res));
};

/**
 * Get a single employee
 */
exports.findEmployeeById = function (req, res, next) {
    var empId = req.params.id;

    Employee.find({
        where: {
            id: empId
        },
        attributes: [
            'id',
            'name',
            'email',
            'role'
        ]
    })
        .then(function (emp) {
            if (!emp) {
                return res.status(404).end();
            }
            res.json(emp);
        })
        .catch(function (err) {
            return next(err);
        });
};

/**
 * Deletes an employee
 */
exports.deleteEmployee = function (req, res) {
    var empId = req.params.id;
    Employee.destroy({
        where: {
            id: empId
        }
    })
        .then(function () {
            res.status(204).end();
        })
        .catch(handleError(res));
};

/**
 * Change an employee password
 */
exports.changePassword = function (req, res, next) {
    var empId = req.emp.id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    Employee.find({
        where: {
            id: empId
        }
    })
        .then(function (emp) {
            emp.password = newPass;
            return emp.save()
                .then(function () {
                    res.status(204).end();
                })
                .catch(validationError(res));

        });
};

exports.updateEmployee = function (req, res) {

    if (req.body.id) {
        delete req.body.id;
    }
    Employee.find({
        where: {
            id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};     