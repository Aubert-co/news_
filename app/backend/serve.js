const express = require('express')
const cors  = require('cors')
const route = require('./routes/router')

const app = express()

require('dotenv').config()
const pathMode = process.env.mode ==="test" ? "testpublic" : "public"

app.use(cors())
app.use(express.json())

app.use('/static',express.static(pathMode))

app.use(express.urlencoded({extended:true}))

app.use(route)


//app.listen(8080,()=>console.log('rodando'))


module.exports = app