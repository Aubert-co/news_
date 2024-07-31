const request = require('supertest');
const {Person,News,Elements, sequelize} = require('../models/index')
const {Op} = require('sequelize')
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
const {persons,news, DeleteAllFiles, serverListen} = require('./fixtures')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,buffer,token,file2,buffer2

const elements = [{order:1,subtitle:'lorem iptsu1',content:'element 1',file},{order:2,subtitle:'lorem iptsu2',content:'iptsu lorem2',file2}]
const userLogged = persons[0]
describe("apis",()=>{
    beforeAll(async()=>{
        app =  serverListen
        file = path.join(__dirname, 'sports.jpg');
        file2 =  path.join(__dirname,'imgupdate.jpg')
        try{
                await Person.bulkCreate( persons )
                await News.bulkCreate( news )
                token = jwt.sign({user_id:userLogged.id},secret)
                buffer = await fs.readFile(file)
                buffer2 = await fs.readFile(file2)
        }catch(err){
            throw err
          
        }
    })
    afterEach(async()=>{
        try{
            jest.clearAllMocks()
            jest.restoreAllMocks(); 
            await Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
            await DeleteAllFiles()
           setTimeout(()=>{},10)
        }catch(err){
            console.error("afterEach"+err)
        }
    })
    
    it( "When a news_id is not sent, it should return an error.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('news_id cannot be null.')
        expect(response.status).toEqual(400)
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)

        expect(mockFS).toHaveBeenCalledTimes(0)
     
    })
    it("When a user sends a news_id that they are not the owner of, it should return an error.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('news_id',3)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('News not found.')
        expect(response.status).toEqual(400)
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)

        expect(mockFS).toHaveBeenCalledTimes(0)
     
    })
    it("When null elements are sent, it should return an error.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('news_id',1)
        
        
        expect(response.body.message).toEqual('Elements cannot be null')
        expect(response.status).toEqual(400)
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
     
    })
    it("When all values are sent correctly, it should save the elements and the images.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
    
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('news_id',1)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
    
        const elementsInDB = await Elements.findAll()
     
        elementsInDB.map(async(val,ind)=>{
            expect(val.order).toEqual(elements[ind].order)
            expect(val.content).toEqual(elements[ind].content)
            expect(val.subtitle).toEqual(elements[ind].subtitle)
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })
        
        expect(elementsInDB).toHaveLength(2)
        expect(mockFS).toHaveBeenCalledTimes(2)
    })
   
    it("When an image is not sent, it should not save a file, and the imgPath in the database should be null.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')

        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'news_id':1,'elements':JSON.stringify( elements )})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
    
        const elementsInDB = await Elements.findAll()
    
        elementsInDB.map((val,ind)=>{
            expect(val.imgPath).toBeNull()
            expect(val.order).toEqual(elements[ind].order)
            expect(val.content).toEqual(elements[ind].content)
            expect(val.subtitle).toEqual(elements[ind].subtitle)

        })
        
        expect(elementsInDB).toHaveLength(2)
        expect(mockFS).toHaveBeenCalledTimes(0)
    })
    
    it("When inserting only one element, it should correctly save the item and the file.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')

        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .field('news_id',1)
        .field('elements',JSON.stringify( elements[0] ))
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
    
        const elementsInDB = await Elements.findAll()
    
        elementsInDB.map(async(val,ind)=>{
            expect(val.imgPath).not.toBeNull()
            expect(val.order).toEqual(elements[0].order)
            expect(val.content).toEqual(elements[0].content)
            expect(val.subtitle).toEqual(elements[0].subtitle)
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })
      
        expect(mockFS).toHaveBeenCalledTimes(1)
    })
    
    it("When sending 2 elements, only the second element with an image should save the elements and file correctly.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element2',file)
        .field('news_id',1)
        .field('elements',JSON.stringify( elements ))
        
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
       
        const elementsInDB = await Elements.findAll()
      
        expect(elementsInDB).toHaveLength(2)
        
        elementsInDB.map(async(val,ind,arr)=>{
            
           expect(arr[0].imgPath).toBeNull()
           expect(arr[1].imgPath).not.toBeNull()
          
           const exists = await existImg(arr[1].imgPath)
           expect(exists).toBeTruthy()
        })
        expect(mockFS).toHaveBeenCalledTimes(1)
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(1)
     
    })
    it("When an error occurs in the database, it should not save the files and items in the database.",async()=>{
        const mockFS = jest.spyOn(fs,'writeFile')
        const mockDB = jest.spyOn(Elements,'bulkCreate').mockImplementation(() => {
            throw new Error('errorMessage');
          });
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('news_id',1)
        .field('elements',JSON.stringify( elements ))
        
    
        expect(response.status).toEqual(500)
    
        const elementsInDB = await Elements.findAll()
          
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(1)
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(0)
        
    })
    it("When an error occurs while saving the files, it should not save the files and items in the database.",async()=>{
        const mockDB = jest.spyOn(Elements,'bulkCreate')
        const mockFS = jest.spyOn(fs,'writeFile').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
     
        const response = await request(app)
        .post('/admin/news/elements/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-element1',file)
        .attach('file-element2',file2)
        .field('news_id',1)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.status).toEqual(500)

        const elementsInDB = await Elements.findAll()
          
        expect(elementsInDB).toHaveLength(0)
        expect(mockDB).toHaveBeenCalledTimes(1)

        expect(mockFS).toHaveBeenCalledTimes(1)
        const directoryPath =  "./testpublic/"
        const files = await fs.readdir(directoryPath);
        expect(files).toHaveLength(0)
    })
  afterAll(async()=>{
    app.close()
    try{
     
       
        await Promise.all([
            DeleteAllFiles(),
            Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
            News.destroy({ where: { id: { [Op.gt]: 0 } } }),
            Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
        ])
    }catch(err){
        console.error("afterAll",err)
    }
    })
 
})

