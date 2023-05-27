'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Athletic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Athletic.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,

    },
    college_course: {
      type:DataTypes.JSON,
      allowNull:false,

    },
    direction: {
      type:DataTypes.JSON,
      allowNull:true,

    },
    img_url: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Athletic',
    tableName: 'athletics'
  });
  return Athletic;
};