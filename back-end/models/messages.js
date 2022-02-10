'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Messages.belongsTo(models.Users, {
        foreignKey : {
          allowNull : false
        }
      })
    }
  }
  Messages.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    like: DataTypes.INTEGER,
    idUsers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};