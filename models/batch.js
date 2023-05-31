const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Batch extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
      this.hasMany(models.Ticket,{
        foreignKey:'batchId',
        as:'ticket'
      })
    }
  }

  Batch.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model: 'Event',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Batch',
      tableName: 'Batchs',
    }
  );

  return Batch;
};
