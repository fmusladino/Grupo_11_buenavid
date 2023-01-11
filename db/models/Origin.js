'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class origin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  origin.init({
    pais: DataTypes.STRING,
    region: DataTypes.STRING,
    zona: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'origin',
  });
  return origin;
};