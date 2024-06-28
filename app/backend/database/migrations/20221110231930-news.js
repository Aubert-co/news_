'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports  ={
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.createTable('news',{
        id:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        content:{
          type:Sequelize.STRING,
          allowNull:false
        },
        category:{
          type:Sequelize.STRING,
          allowNull:false
        },
      date:{type:Sequelize.DATE},
      title:{
          type:Sequelize.STRING,
          allowNull:false
      },
      imgName:{type:Sequelize.STRING}, 
      imgPath:{type:Sequelize.STRING},
      resume:{type:Sequelize.STRING}
      })
      await transaction.commit();
    }catch(err){
      await transaction.rollback()
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.removeColumn('news_db')
    }catch(err){
      await transaction.rollback()
      throw err
    }
  }
};

