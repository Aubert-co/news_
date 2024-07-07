const request = require('supertest');
const server = require('../serve');
const {Person,News,Elements} = require('../models/index')
const {Op} = require('sequelize')
const path = require('path');
const { existImg } = require('../helpers/saveFiles');
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,mockFS,buffer,token,file2,buffer2,news_id
var imgPaths = []
var elementsIds = []
const elements = [{order:1,subtitle:'lorem iptsu1',content:'element 1',file},{order:2,subtitle:'lorem iptsu2',content:'iptsu lorem2',file2}]

const user =  {id:1,name:"matheus",password:'1234567e',imgPath:'oqhwnejkqwne'}
describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8082)
        file = path.join(__dirname, 'sports.jpg');
        file2 =  path.join(__dirname,'imgupdate.jpg')
        try{
            await Person.bulkCreate( user )
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
            throw err
          
        }
    })
    beforeEach(async()=>{
        try{
        jest.clearAllMocks()
        mockFS = jest.spyOn(fs,'writeFile')
        buffer = await fs.readFile(file)
        buffer2 = await fs.readFile(file2)
        
        
        }catch(err){
            console.error("beforeach"+err)
        }
    })
    

    it("Should create a new news and news elements ",async()=>{
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const response = await request(app)
        .post('/news/create')
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
        news_id = newsInDB[0].id
   

        expect(elementsInDB).toHaveLength(2)

        elementsInDB.map((val,ind)=>{
            imgPaths.push( val.imgPath )
            elementsIds.push(val.id)
        })

        expect(newsInDB[0].title).toEqual(title)
        expect(newsInDB[0].resume).toEqual(resume)
  
        
        imgPaths.map((val)=>{
            const ExistImg = existImg(val)
            expect(ExistImg).toBeTruthy()
        })

        expect(mockFS).toHaveBeenCalledTimes(3)
     
    })
    it("When create a two elements but only send one image should save the element with correct img",async()=>{
        const resume = "qmkejljqnweklqm"
        const title = "çqwekmrljqnejlq"
        const elementsBefore = await Elements.findAll()
        const response = await request(app)
        .post('/news/create')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .attach('file-main',file)
        .attach('file-element1')
        .attach('file-element2',file2)
        .field('title',title)
        .field('resume',resume)
        .field('elements',JSON.stringify( elements ))
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        
        const newsInDB = await News.findAll()
        const elementsInDB = await Elements.findAll()
        expect(elementsInDB).toHaveLength(elementsBefore.length +2)
        imgPaths.push(  newsInDB[0].imgPath )
        imgPaths.push(elementsInDB[1].imgPath)
       


        expect(newsInDB[0].title).toEqual(title)
        expect(newsInDB[0].resume).toEqual(resume)
  
        
       expect(mockFS).toHaveBeenCalledTimes(2)
   
    })
    it("Should delete only the news and elements from the news_id sent",async()=>{
        const mockUnlinkFS= jest.spyOn(fs,'unlink')

        const newsBeforeDelete = await News.findAll({where:{id:news_id}})
        const elemensBeforeDelete = await Elements.findAll({where:{news_id}})
        const newsImgBeforeDel = newsBeforeDelete[0].imgPath
        
        expect(newsBeforeDelete).toHaveLength(1)
        expect(elemensBeforeDelete).toHaveLength(2)
        expect(await existImg(newsImgBeforeDel)).toBeTruthy()
        
        elemensBeforeDelete.map(async(val)=>{
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })

        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        expect(mockUnlinkFS).toHaveBeenCalledTimes(3)
        
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()
      
        expect(findNews).toHaveLength(1)
        expect(findElements).toHaveLength(2)

        expect(await existImg( findNews[0].imgPath )).toBeTruthy()

        const calls = mockUnlinkFS.mock.calls.map((val)=>val.join(''))
        elemensBeforeDelete.map(async(val,ind)=>{
            expect(await existImg(val.imgPath)).toBeFalsy()
            expect(calls[ind]).toEqual(val.imgPath)
        })
       
        expect(calls.includes(newsImgBeforeDel)).toBeTruthy()
    })
  
  /*  it("Should delete all elements and destroys images",async()=>{
        const mockUnlinkFS= jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({elements_id:elementsIds})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        expect(mockUnlinkFS).toHaveBeenCalledTimes(3)
    })
  */
   
  afterAll(async()=>{
    try{
        await Promise.all([
            Person.destroy({ where: { id: { [Op.gt]: 0 } } }),
            News.destroy({ where: { id: { [Op.gt]: 0 } } }),
            Elements.destroy({ where: { id: { [Op.gt]: 0 } } })
        ])
        imgPaths.map(async(val)=>{
            const exists = await existImg(val)
            if(val && exists )await fs.unlink(val)
        })
    
    }catch(err){
        throw err
    }
    })
 
})