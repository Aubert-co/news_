const route = require('express').Router()

const LoginAndRegister = require('./LoginAndRegister')

route.use(LoginAndRegister)
module.exports = route