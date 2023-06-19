'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transaction_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_approved: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_six_digits: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_four_digits: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // PIX, ou Cartao
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
    }
  );
  return Order;
};
