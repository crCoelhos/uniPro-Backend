const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Lot extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
      this.hasMany(models.Ticket,{
        foreignKey:'lotId',
        as:'ticket'
      })
    }
  }

  Lot.init(
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
      modelName: 'Lot',
      tableName: 'Lots',
    }
  );

  return Lot;
};
