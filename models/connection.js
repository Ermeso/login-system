const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conexão com DB efetuada com Sucesso');
}).catch((erro) => {
    console.log('Não foi possivel se conectar com o DB!');
    console.log(erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}