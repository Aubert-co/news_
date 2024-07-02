const request = require('supertest');
const server = require('../serve');
const {Person} = require('../models/index')
const {Op} = require('sequelize')
const bcrypt = require("bcrypt")
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const fs = require('fs').promises
require('dotenv')

var app,file,img_Path,mockFS,buffer
const personData =  {name:"matheus",password:'1234567e'}
describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8082)
        file = path.join(__dirname, 'sports.jpg');
        
    })
    beforeEach(async()=>{
        jest.clearAllMocks()
        mockFS = jest.spyOn(fs,'writeFile')
        buffer = await fs.readFile(file)
    })
    it("Should create a new user.",async()=>{
        
        
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .attach('file',file)
        .field('name',personData.name)
        .field('password',personData.password)

        expect(response.body.message).toBe('sucess')
        expect(response.status).toBe(201)
     
        const findValuesAtDB = await Person.findOne({where:{name:personData.name}})
       
        expect(findValuesAtDB.name).toEqual(personData.name)
        expect(findValuesAtDB.password).not.toEqual(personData.password)
        
        const existImgInFolder = await existImg(findValuesAtDB.imgPath)
        expect(existImgInFolder).toBeTruthy()
        img_Path = findValuesAtDB.imgPath
       const comparePassword  = await bcrypt.compare(personData.password,findValuesAtDB.password)

       const items = await fs.readdir('./testpublic');
       expect(items.length).toEqual(1)
       expect(mockFS).toHaveBeenCalledTimes(1)
       const firstArgument = mockFS.mock.calls[0][0];
       const secondArgument = mockFS.mock.calls[0][1]
       expect(firstArgument).toBe(img_Path);    
       expect(secondArgument.toString()).toBe(Buffer.from(buffer).toString())

       expect(comparePassword).toBeTruthy()
    })

    it("When try to create a user but a user already exists should return an error.",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .attach('file',file)
        .field('name',personData.name)
        .field('password',personData.password)

        expect(response.body.message).toBe('User already exists')
        expect(response.status).toBe(404)
     
        const findValuesAtDB = await Person.findAll()
        expect(findValuesAtDB).toHaveLength(1)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        expect(mockFS).toHaveReturnedTimes(0)
    })
    it("When not send a image should return an error",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
         .attach('file','')
        .field('name',personData.name)
        .field('password',personData.password)


        expect(response.body.message).toEqual('No image were sent in the request.')
        expect(response.status).toBe(400)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        expect(mockFS).toHaveReturnedTimes(0)
    })
    it("Should return an error when name is not sent",async()=>{
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .attach('file',file)
        .field('name','')
        .field('password',personData.password)

        expect(response.body.message).toEqual('Missing fields')
        expect(response.status).toBe(400)
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        expect(mockFS).toHaveReturnedTimes(0)
    })
    it("Should return an error when password is not sent",async()=>{
        const name ="jose"
        const response = await request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .attach('file','')
        .field('name',personData.name)
        .field('password','')
        
        expect(response.body.message).toEqual('Missing fields')
        expect(response.status).toBe(400)
        const datas = await Person.findOne({where:{name}})
        expect(datas).toBeNull()
        const items = await fs.readdir('./testpublic');
        expect(items.length).toEqual(1)
        expect(mockFS).toHaveReturnedTimes(0)
    })
  
   
  afterAll(async()=>{
        try{
            await Promise.all([
                Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
                fs.unlink(img_Path)
            ])
            app.close()
    
        }catch(err){
            console.error("afterAll"+err)
        }
    })
 
})