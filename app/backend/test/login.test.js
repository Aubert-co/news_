const request = require('supertest');
const server = require('../serve');
const {Person} = require('../models/index')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
const bcrypt = require("bcrypt")
require('dotenv')
const secret = process.env.SECRET_JWT
var app,pass
const personData =  {id:10,name:"lucas",password:'1234567e',imgPath:'imagriquweqw'}

describe("POST/login",()=>{
    beforeAll(async()=>{
        app =  server.listen(8081)
        
        const password = await bcrypt.hash(personData.password,10)
        await Person.create( {id:personData.id,name:personData.name,password,imgPath:personData.imgPath} )
        .catch((err)=>{
            console.error("err beforeall",err)
          
        })
     
    })

  it("Should return status 404 when the user is not registered in the database.",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({name:"matues",password:'12'})
        expect(response.body.message).toBe('User not found')
        expect(response.status).toBe(404)
        
    })
    
    it("Should return success when valid credentials are sent",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({name:personData.name,password:personData.password})
        
      
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Successful login')
       
        expect(response.body).toHaveProperty('token')

        jwt.verify(response.body.token,secret,(err,decoded)=>{
            if(err)throw err

            expect(decoded.user_id).toBe(personData.id)
        })
    })
  
    it("Should return an error message and status 401 when sending an incorrect password",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({name:personData.name,password:personData.password+"10"})
        
        expect(response.status).toBe(401)
        expect(response.body.message).toBe('Invalid data')
    
    })
    it("Should return an error when password is not provided.",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({name:personData.name,password:""})
        
        expect(response.status).toBe(400)
    })
    it("Should return an error when name is not sent.",async()=>{
        const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({name:"",password:"1234"})
        
        expect(response.status).toBe(400)
       
        
    })
 afterAll(async()=>{
    await Person.destroy({ where: { id: { [Op.gt]: 0 } } });
 })
})