const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Lot, {
        foreignKey: 'lotId',
        as: 'lot',
      });
    }
  }

  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'Tickets',
    }
  );

  return Ticket;
};
