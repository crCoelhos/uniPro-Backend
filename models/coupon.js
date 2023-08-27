'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      // define association here
    }
  }
  Coupon.init(
    {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          type: {
            type: DataTypes.ENUM('value', 'percentage', 'exclusive'),
            allowNull: false,
          },
          amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isValidAmount(value) {
                  if (this.type === 'percentage' && (value < 0 || value > 100)) {
                    throw new Error('Porcentagem precisa ser de um valor entre 0 e 100.');
                  } else if (this.type === 'value' && value < 0) {
                    throw new Error('O Valor do desconto precisa ser positivo!');
                  }
                },
              },
          },
          expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '',
          },
          isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          usageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          usageMax: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
              isPositive(value) {
                if (value !== null && value < 0) {
                  throw new Error('Uso maximo so pode ser positivo ou nulo.');
                }
              },
            },
          },
          isUniqueUse: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          usedByUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          usedByTicketId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
    },
    {
      sequelize,
      modelName: 'Coupon',
      tableName: 'coupons',
    }
  );
  return Coupon;
};