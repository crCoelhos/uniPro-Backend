'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
      sex: {
        type: Sequelize.ENUM('F',"M"),
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
      roleId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
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