'use strict';

const {Model} = require('sequelize')

module.exports = (sequelize,DataTypes)=>{
  class News extends Model {
    static associate(models){
      News.hasMany(models.Elements,{
          foreignKey:'news_id',
          as:'elements'
      })
      News.belongsTo( models.Person,{
        foreignKey:'creator',
        as:'person'
      })
    }
  }

  News.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    resume:{
      type:DataTypes.STRING,
      allowNull:true
    },
    creator:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    imgPath:{
      type:DataTypes.STRING,
      allowNull:false
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
    modelName:'News',
    timestamps:true,
  })
  return News;
}