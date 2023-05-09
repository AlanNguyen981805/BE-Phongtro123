"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.hasOne(models.Posts, { foreignKey: "imagesId", as: 'image'});
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // giá trị mặc định
      },
      images: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Image;
};
