const sequelize = require('./connection');
const db = require('./connection');

const Usuarios = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
});

// Usuarios.sync({force: true});

module.exports = Usuarios;