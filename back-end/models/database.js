var Sequelize = require('sequelize');
var sequelize = new Sequelize('P7_openClassRooms', 'root', '11021102Aa!', {
host: 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;