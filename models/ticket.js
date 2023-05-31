const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Batch, {
        foreignKey: 'batchId',
        as: 'batch',
      });
      this.belongsToMany(models.User,{
        through:'user_tickets',
        as: 'user',
        foreignKey:'ticketId', 
        otherKey: 'userId'
      })
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
      status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   references:{
      //     model:'users',
      //     key: 'id'
      //   }
      // },
      inProcessing:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'batchs',
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
