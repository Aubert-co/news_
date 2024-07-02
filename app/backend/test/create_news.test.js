const request = require('supertest');
const server = require('../serve');
const {Person,News,Elements} = require('../models/index')
const {Op} = require('sequelize')
const bcrypt = require("bcrypt")
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,img_Path,mockFS,buffer,token
const user =  {id:1,name:"matheus",password:'1234567e',imgPath:'oqhwnejkqwne'}
describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8082)
        file = path.join(__dirname, 'sports.jpg');
        try{
            await Person.bulkCreate( user )
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
            throw err
          
        }
    })
    beforeEach(async()=>{
        jest.clearAllMocks()
        mockFS = jest.spyOn(fs,'writeFile')
        buffer = await fs.readFile(file)
    })
    

    it("When try to create a user but a user already exists should return an error.",async()=>{
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .attach('file-element1',file)
        .attach('file-element2',file)
        .field('title',title)
        .field('resume',resume)
        .field('elements',JSON.stringify([{order:1,subtitle:'lorem iptsu1',content:'iptsu lorem1'},{order:2,subtitle:'lorem iptsu2',content:'iptsu lorem2'}]))
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()
        img_Path =  newsInDB[0].imgPath

        expect(elementsInDB).toHaveLength(2)
        expect(newsInDB[0].title).toEqual(title)
        expect(newsInDB[0].resume).toEqual(resume)
  
        const existImgInFolder = await existImg(img_Path)

        expect(existImgInFolder).toBeTruthy()
    })

  
  
   
  afterAll(async()=>{
    try{
        await Promise.all([
            Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
            News.destroy({ where: { id: { [Op.gt]: 0 } } }),
            Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
        ])
        const exists = await existImg(img_Path)

        if(exists)await fs.unlink(img_Path)
    }catch(err){
        throw err
    }
    })
 
})