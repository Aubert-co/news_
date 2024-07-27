const request = require('supertest');
const {Person,News,Elements} = require('../models/index')
const {Op} = require('sequelize')
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const {persons,news, DeleteAllFiles,elements,NewsWithTruImg,serverListen} = require('./fixtures')
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,token,file2,MaiElements,MainNews


const user = persons[0]
describe("apis",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.restoreAllMocks(); 
        
    })
    afterEach(()=>{
        jest.clearAllMocks()
        jest.restoreAllMocks(); 
      
    })
    beforeAll(async()=>{
        app =  serverListen
        file = path.join(__dirname, 'sports.jpg');
        file2 =  path.join(__dirname,'imgupdate.jpg')
        const data = await fs.readFile(file2)
        const files ={name:'imgupdate.jpg',data}
       
        try{
            await DeleteAllFiles()
            MainNews = await NewsWithTruImg(news)
            MaiElements = await NewsWithTruImg(elements)
        
            await Promise.all([
             
                Person.bulkCreate( persons ),
                News.bulkCreate( MainNews ),
                Elements.bulkCreate( MaiElements )
            ])
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
            console.error("beforeALl",err)
            throw err
          
        }
    })
    it("When send all value correct should save the elements and the images",async()=>{
       
        const mockFS = jest.spyOn(fs,'unlink')
        jest.spyOn(fs, 'unlink').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( elements_id )})
        
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(2)
    })
    it("When send all value correct should save the elements and the images",async()=>{
       
        const mockFS = jest.spyOn(fs,'unlink')
        jest.spyOn(fs, 'unlink').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( elements_id )})
        
    
        const elementsInDB = await Elements.findAll()

        expect(elementsInDB).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(2)
    })
       
})