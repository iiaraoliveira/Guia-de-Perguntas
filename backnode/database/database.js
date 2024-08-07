const Sequelize = require('sequelize');

const connection = new Sequelize('guia-de-perguntas', 'root', '43215', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;