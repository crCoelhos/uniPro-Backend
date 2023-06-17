const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event',
      });
      // this.belongsToMany(models.User,{
      //   through:'user_tickets',
      //   as: 'user',
      //   foreignKey:'ticketId', 
      //   otherKey: 'userId'
      // })
      this.hasMany(models.User_ticket,{
        foreignKey:'ticketId',
        as:'User_ticket'
      })
    }
  }

  Ticket.init(
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
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      typeTicketId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model: 'Type_tickets',
          key: 'id'
        }
      },
      eventId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model: 'Event',
          key: 'id'
        }
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
