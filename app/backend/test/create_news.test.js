const request = require('supertest');
const {Person,News,Elements} = require('../models/index')
const {Op} = require('sequelize')
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const {persons,news, DeleteAllFiles,serverListen} = require('./fixtures')
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,token,file2


const elements = [{order:1,subtitle:'lorem iptsu1',content:'element 1',file},{order:2,subtitle:'lorem iptsu2',content:'iptsu lorem2',file2}]

const user =  {id:1,name:"matheus",password:'1234567e',imgPath:'oqhwnejkqwne'}
describe("apis",()=>{
    beforeAll(async()=>{
        app = serverListen
        file = path.join(__dirname, 'sports.jpg');
        file2 =  path.join(__dirname,'imgupdate.jpg')
        try{
            await Person.bulkCreate( persons )
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
            throw err
          
        }
    })
    afterEach(async()=>{
        try{
            jest.clearAllMocks()
            jest.restoreAllMocks(); 
       
            await Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
            await News.destroy({ where: { id: { [Op.gt]: 0 } } })
            await DeleteAllFiles()
           setTimeout(()=>{},10)
        }catch(err){
            console.error("afterEach"+err)
        }
    })
    
    it("When not send a title should return an error and not save a new news",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('title','')
        .field('resume',resume)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('Title cannot be null.')
        expect(response.status).toEqual(400)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()

        expect(newsInDB).toHaveLength(0)
        expect(elementsInDB).toHaveLength(0)


        expect(mockFS).toHaveBeenCalledTimes(0)
     
    })
    it("When not send a image should return an error and not save a new news",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main','')
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('title','qweqwe')
        .field('resume',resume)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('The main article needs a image.')
        expect(response.status).toEqual(400)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()

        expect(newsInDB).toHaveLength(0)
        expect(elementsInDB).toHaveLength(0)


        expect(mockFS).toHaveBeenCalledTimes(0)
     
    })
    it("When send only elements should not create a new news",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('Title cannot be null.')
        expect(response.status).toEqual(400)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()

        expect(newsInDB).toHaveLength(0)
        expect(elementsInDB).toHaveLength(0)


        expect(mockFS).toHaveBeenCalledTimes(0)
     
     
    })
    it("When send only main news and not send elements should create onlyn main news",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .field('title',title)
        .field('resume',resume)
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()
      
        expect(newsInDB).toHaveLength(1)
        expect(elementsInDB).toHaveLength(0)


        expect(newsInDB[0].title).toEqual(title)
        expect(newsInDB[0].resume).toEqual(resume)
  

        expect(mockFS).toHaveBeenCalledTimes(1)
     
    })
   
    it("Should create a new news and news elements ",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('title',title)
        .field('resume',resume)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()
      
        expect(newsInDB).toHaveLength(1)
        expect(elementsInDB).toHaveLength(2)


        expect(newsInDB[0].title).toEqual(title)
        expect(newsInDB[0].resume).toEqual(resume)
  

        expect(mockFS).toHaveBeenCalledTimes(3)
     
    })
    
    it("When an error occurs in the database, it should not save the files and items in the database.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const mockDB = jest.spyOn(News,'create').mockImplementation(() => {
            throw new Error('errorMessage');
          });
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
      
        const response = await request(app)
        .post('/admin/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .attach('file-element1')
        .attach('file-element2',file2)
        .field('title',title)
        .field('resume',resume)
        .field('elements',JSON.stringify( elements ))

        expect(response.status).toEqual(500)
    
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()
          
        expect(newsInDB).toHaveLength(0)
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(1)
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
   
    })
    it("When an error occurs while saving the files, it should not save the files and items in the database.",async()=>{
        const mockDB = jest.spyOn(News,'create')
        const mockFS = jest.spyOn(fs,'writeFile').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
          const resume = "qmkejljqnweklqm"
            const title = "çqwekmrljqnejlq"
          const response = await request(app)
          .post('/admin/news/create')
          .set('Content-Type', 'application/json')
          .set('Authorization',`Bearer ${token}`)
          .attach('file-main',file)
          .attach('file-element1',file)
          .attach('file-element2',file2)
          .field('title',title)
          .field('resume',resume)
          .field('elements',JSON.stringify( elements ))
        
        expect(response.status).toEqual(500)

        const elementsInDB = await Elements.findAll()
          
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(1)

     
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
    })
    it("When an error occurs while saving the files, it should not save the files and items in the database.",async()=>{
        const mockDB = jest.spyOn(Elements,'bulkCreate')
        const mockFS = jest.spyOn(fs,'writeFile').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
          const resume = "qmkejljqnweklqm"
            const title = "çqwekmrljqnejlq"
          const response = await request(app)
          .post('/admin/news/create')
          .set('Content-Type', 'application/json')
          .set('Authorization',`Bearer ${token}`)
          .attach('file-main',file)
          .field('title',title)
          .field('resume',resume)
       
        
        expect(response.status).toEqual(500)

        const elementsInDB = await Elements.findAll()
          
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(0)

     
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
    })
    it("When try to have only main news and occurs an error in db should not save the images and items in db",async()=>{
        
        const mockFS = jest.spyOn(fs,'writeFile')
        const mockDB = jest.spyOn(News,'create').mockImplementation(() => {
            throw new Error('errorMessage');
          });
          const resume = "qmkejljqnweklqm"
            const title = "çqwekmrljqnejlq"
          const response = await request(app)
          .post('/admin/news/create')
          .set('Content-Type', 'application/json')
          .set('Authorization',`Bearer ${token}`)
          .attach('file-main',file)
          .field('title',title)
          .field('resume',resume)
       
          

        expect(response.status).toEqual(500)

        const elementsInDB = await Elements.findAll()
          
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(1)

     
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
    })
   
  afterAll(async()=>{
    try{
        app.close()
        await Promise.all([
            DeleteAllFiles(),
            Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
            News.destroy({ where: { id: { [Op.gt]: 0 } } }),
            Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
        ])
    }catch(err){
        throw err
    }
    })
 
})