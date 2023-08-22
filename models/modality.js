'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Modality.init({
    name:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    eventId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: 'Events',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Modality',
    tableName: 'Modalities'
  });
  return Modality;
};