const Sequelize = require("sequelize")
const connection = require("./database")

const Usuario = connection.define('usuarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
        validate: {
            isEmail: true // Valida se o campo é um endereço de e-mail válido
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync({force: false}).then(()=>{
    console.log("Tabela Criada!")
})

module.exports = Usuario;