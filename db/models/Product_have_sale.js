'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_have_sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_have_sale.init({
    product_id: DataTypes.INTEGER,
    sales_id: DataTypes.INTEGER,
    cantidad: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'product_have_sale',
  });
  return product_have_sale;
};