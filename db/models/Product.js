'use strict';
const {
  Model
} = require('sequelize');
const Category = require('./Category');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        foreignKey:'id',
        targetKey: 'category_id'
      })
    }
  }
  Product.init({
    description: DataTypes.TEXT,
    year: DataTypes.DATE,
    price: DataTypes.FLOAT,
    discount: DataTypes.STRING,
    recomended: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    winery_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    origin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};