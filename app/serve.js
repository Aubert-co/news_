const express = require('express')
const cors  = require('cors')
const route = require('./api/route.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static',express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(route)

require('dotenv').config()
const testOrListen =process.env.DB_DATABASE === 'test'

const listenApp = (test)=>{
    if(test)return module.exports = app

    app.listen(8080,()=>{
        console.log('running at port 8080')
    })
}
listenApp(testOrListen)