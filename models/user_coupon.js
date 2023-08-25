'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Used_coupon extends Model {
    static associate(models) {
        this.belongsTo(models.User,
            { foreignKey: 'userId', as: 'user' });
    }
  }
  Used_coupon.init(
    {
        couponCode: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
              }
          },
    },
    {
      sequelize,
      modelName: 'Used_coupon',
      tableName: 'Used_coupons',
    }
  );
  return Used_coupon;
};