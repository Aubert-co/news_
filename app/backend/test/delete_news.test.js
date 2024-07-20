const request = require('supertest');
const server = require('../serve');
const {Person,News,Elements} = require('../models/index')
const {Op} = require('sequelize')
const path = require('path');
const { existImg,savesImg,createPathImg } = require('../helpers/saveFiles');
const {persons,news, DeleteAllFiles,elements,NewsWithTruImg} = require('./fixtures')
const fs = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv')
const secret = process.env.SECRET_JWT
var app,file,token,file2,totallyElements,MaiElements,MainNews,
totallyNews

const user = persons[0]
describe("apis",()=>{
    beforeAll(async()=>{
        app =  server.listen(8082)
        file = path.join(__dirname, 'sports.jpg');
        file2 =  path.join(__dirname,'imgupdate.jpg')
        const data = await fs.readFile(file2)
        const files ={name:'imgupdate.jpg',data}
       
    
        try{
          
            MainNews = await NewsWithTruImg(news)
            MaiElements = await NewsWithTruImg(elements)
            totallyElements = MaiElements.length
            totallyNews = MainNews.length
            await Person.bulkCreate( persons )
            await News.bulkCreate( MainNews )
            await Elements.bulkCreate( MaiElements )
          
            token = jwt.sign({user_id:user.id},secret)
        }catch(err){
            console.error("beforeALl",err)
            throw err
          
        }
    })
    it("When send only news to delete should delete only main news",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')
        
        const news_id = news[0].id
        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const findNews = await News.findAll({where:{id:news_id}})
        const findElements = await Elements.findAll({where:{news_id}})

        expect(findNews).toEqual([])
        expect( findElements ).toEqual([])
        expect(mockFS).toHaveBeenCalledTimes(3)
        expect(mockFS.mock.calls.some(call => call.includes(news[0].imgPath))).toBeTruthy();
        
        elements.filter((val)=>val.news_id ===  news_id)
        .map(async({imgPath})=>{
            expect(mockFS.mock.calls.some(call => call.includes( imgPath ))).toBeTruthy();
            const exists = await existImg(imgPath)
            expect(exists).not.toBeTruthy()
        })

    })
    /*it("When send main news and elements should delete all",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({news_id})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()

        expect(findNews).toEqual([])
        expect(findElements).toEqual([])
        expect(mockFS).toHaveBeenCalledTimes(3)

        
    })
    it("When send main news and elements should delete all",async()=>{
        const mockFS = jest.spyOn(fs,'unlink')
        const elementsBeforeDelete =  await Elements.findAll()
        expect(elementsBeforeDelete).toHaveLength(2)
        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({elements_id:elementsIds})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const findNews = await News.findAll()
        const findElements = await Elements.findAll()

        expect(findNews).toHaveLength(1)
        expect(findElements).toEqual([])
        expect(mockFS).toHaveBeenCalledTimes(1)

        
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
  
  it("Should delete all elements and destroys images",async()=>{
        const mockUnlinkFS= jest.spyOn(fs,'unlink')

        const response = await request(app)
        .delete('/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({elements_id:})
        
        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        expect(mockUnlinkFS).toHaveBeenCalledTimes(3)
    })*/
    afterAll(async()=>{
        try{
            
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