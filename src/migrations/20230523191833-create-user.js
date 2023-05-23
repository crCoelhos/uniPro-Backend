'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstName: {
        type:Sequelize.STRING,
        allowNull: false
      },
      lastName: 
      {
        type:Sequelize.STRING,
        allowNull: false
      },
      password: {
        type:Sequelize.STRING,
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      contact: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      cpf: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};