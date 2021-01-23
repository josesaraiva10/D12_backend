module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        apelido: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        sobre: {
            type: Sequelize.TEXT
        },
        tipo: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('on', 'off'),
            defaultValue: 'on'
        }
    });
    return User;
};