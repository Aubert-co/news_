'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('News',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      resume:{
        type:Sequelize.STRING,
        allowNull:true
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false
      },
      creator:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      imgPath:{
        type:Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('News');
     
  }
};
