'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('news',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      resume:{
        type:Sequelize.STRING,
        allowNull:true
      },
      creator:{
        type:Sequelize.STRING,
        allowNull:false
      },
      imgPath:{
        type:Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false 
      }
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('news');
     
  }
};
