require('dotenv').config()
var configMode = process.env.mode === undefined ? "development": process.env.mode

const config =  {
  development: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging":false,
    "define": {
      freezeTableName: true,
      timestamps: false,
      plural: false
    },
  },
  test: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASETEST,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging":false,
    "define": {
      freezeTableName: true,
      timestamps: false,
      plural: false
    },
  },
  production: {
    "username": "root",
    "password": null,
    "database": "others2",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false,
    "define": {
      freezeTableName: true,
      timestamps: false,
      plural: false
    },
  }
}

module.exports = config[configMode]