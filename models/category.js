const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event',
      });
      this.belongsTo(models.Types_ticket, {
        as: 'typeTicket',
        foreignKey: 'typeTicketId',
      });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      },
      typeTicketId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model: 'Type_tickets',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
    }
  );

  return Category;
};
