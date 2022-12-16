import express from 'express'
import cors from 'cors'
import route  from './controller/route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static',express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(route)
app.listen(8080,()=>{
    console.log('rodando')
})
