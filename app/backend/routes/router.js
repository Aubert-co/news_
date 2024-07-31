const route = require('express').Router()

const LoginAndRegister = require('./LoginAndRegister')
const AdmNews = require('./adminstration_news')
route.use(LoginAndRegister)
route.use('/admin',AdmNews)
module.exports = route