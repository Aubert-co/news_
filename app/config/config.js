require('dotenv').config()
const database =process.env.DB_DATABASE === 'test'?'test':'development'
const config =  {
  development: {
    "username": "root",
    "password": null,
    "database": "users",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  },
  test: {
    "username": "root",
    "password": null,
    "database": "news_test",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  },
  production: {
    "username": "root",
    "password": null,
    "database": "users",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  }
}

module.exports = config[database]