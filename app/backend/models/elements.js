'use strict';

const {Model} = require('sequelize')

module.exports = (sequelize,DataTypes)=>{
  class Elements extends Model {
    static associate(models){
        Elements.belongsTo(models.News,{
            foreignKey:'news_id',
            as:'news',
            sourceKey:'id'
        })
    }
  }

  Elements.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    news_id:{
        allowNull:false,
        type:DataTypes.INTEGER
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subtitle:{
      type:DataTypes.STRING,
      allowNull:true
    },
    content:{
      type:DataTypes.STRING,
      allowNull:true
    },
    imgPath:{
      type:DataTypes.STRING,
      allowNull:true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false 
    }
  },{
    sequelize,
    modelName:'Elements',
    timestamps:true,
  })
  return Elements;
}