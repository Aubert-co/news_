'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Elements',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      news_id:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:'News',
          key:'id'
        }    
      },
    order:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    subtitle:{
      type:Sequelize.STRING,
      allowNull:true
    },
    content:{
      type:Sequelize.STRING,
      allowNull:true
    },
    imgPath:{
      type:Sequelize.STRING,
      allowNull:true
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
    
    await queryInterface.dropTable('Elements');
     
  }
};
