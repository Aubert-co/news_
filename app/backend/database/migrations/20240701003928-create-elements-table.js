'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('elements',{
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
          model:'news',
          key:'id'
        }    
      },
    order:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    type:{
        type:Sequelize.ENUM('subtitle','content'),
        allowNull:false
    },
    text:{
      type:Sequelize.STRING,
      allowNull:true
    },
    imgPath:{
      type:Sequelize.STRING,
      allowNull:true
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
    
    await queryInterface.dropTable('elements');
     
  }
};
