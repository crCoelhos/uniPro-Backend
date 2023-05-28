const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Lot extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
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
    },
    {
      sequelize,
      modelName: 'Lot',
      tableName: 'Lots',
    }
  );

  return Lot;
};
