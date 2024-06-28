const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config')

const db = {};
require('dotenv').config()
const database =process.env.DB_DATABASE === 'test'?'news_test':'users'

let sequelize=
  new Sequelize(database,'root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
    define:{
      timestamps: false
    }
  })


fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 