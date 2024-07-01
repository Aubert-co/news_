
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Person', {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },      
      name: {
        type:Sequelize.STRING,
        allowNull:false
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      imgPath:{
        type:Sequelize.STRING,
        allowNull:false
      },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true 
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Person');
  }
};
