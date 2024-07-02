'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      Person.hasMany(models.News, {
        foreignKey: 'id',
        as: 'news',
      });
    }
  }
    Person.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },      
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    imgPath:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};