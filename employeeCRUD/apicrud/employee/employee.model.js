module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Employee", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'The specified email address is already in use.'
            },
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'employee'
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    })
}