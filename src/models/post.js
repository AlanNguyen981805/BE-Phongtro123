"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Images, {
        foreignKey: "imagesId",
        targetKey: "id",
        as: "image",
      });
      Post.belongsTo(models.Attributes, {
        foreignKey: "attributesId",
        targetKey: "id",
        as: "attr",
      });
      Post.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // giá trị mặc định
      },
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelCode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributesId: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      price: DataTypes.STRING,
      acreage: DataTypes.STRING,
      province: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.STRING,
      overviewId: DataTypes.STRING,
      imagesId: DataTypes.STRING,
      city: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("city"));
        },
        set: function (value) {
          return this.setDataValue("city", JSON.stringify(value));
        },
      },
      district: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("district"));
        },
        set: function (value) {
          return this.setDataValue("district", JSON.stringify(value));
        },
      },
      ward: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("ward"));
        },
        set: function (value) {
          return this.setDataValue("ward", JSON.stringify(value));
        },
      },
      rentalObj: DataTypes.STRING,
      endDate: DataTypes.STRING,
      highlight: DataTypes.BOOLEAN,
      view: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Post;
};
