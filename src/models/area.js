'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Area.init({
    code: DataTypes.STRING,
    order: DataTypes.INTEGER,
    value: DataTypes.STRING,
    min: DataTypes.STRING,
    max: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Areas',
  });
  return Area;
};