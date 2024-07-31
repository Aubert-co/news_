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
       
       
        try{
            await DeleteAllFiles()
            MainNews = await NewsWithTruImg(news)
            MaiElements = await NewsWithTruImg(elements)
        
            await Promise.all([
             
                Person.bulkCreate( persons ),
                News.bulkCreate( MainNews ),
                Elements.bulkCreate( MaiElements )
            ])
            
        }catch(err){
            console.error("beforeALl",err)
            throw err
          
        }
    })
    it("When attempting to delete, if an error occurs, neither the images nor the items in the database should be deleted.",async()=>{
        const user = persons[0]
        const referedElement = elements[0].id
        const referedNews = news[0].id
        const token = jwt.sign({user_id:user.id},secret)
     
        const mockFS = jest.spyOn(fs,'unlink')
        jest.spyOn(fs, 'unlink').mockImplementation(() => {
            return Promise.reject(new Error('Failed to unlink'));
          });
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( [referedElement])})

        
        expect(response.status).toEqual(500)
        expect(mockFS).toHaveBeenCalledTimes(1)
        const [newsInDB,elementsInDB ]=await Promise.all([ News.findAll({where:{id:referedNews}}), Elements.findAll({where:{id:referedElement}})])
        
        expect(newsInDB).toHaveLength(1)
        const existNewsImg = await existImg(newsInDB[0].imgPath)

        expect(existNewsImg).toBeTruthy()
        expect(elementsInDB).toHaveLength(1)

        elementsInDB.map(async(val)=>{
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })
    })
    it("When attempting to delete, if an error occurs, neither the images nor the items in the database should be deleted.",async()=>{
        const user = persons[0]
        const referedElement = elements[0].id
        const referedNews = news[0].id
        const token = jwt.sign({user_id:user.id},secret)
     
        const mockFS = jest.spyOn(fs,'unlink')
        const mockDBElements = jest.spyOn(Elements,'destroy')
        .mockImplementation(() => {
            throw new Error('failed to destroy');
          });
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( [referedElement])})

        
        expect(response.status).toEqual(500)
        expect(mockFS).toHaveBeenCalledTimes(0)
        const [newsInDB,elementsInDB ]=await Promise.all([ News.findAll({where:{id:referedNews}}), Elements.findAll({where:{id:referedElement}})])
        
        expect(newsInDB).toHaveLength(1)
        const existNewsImg = await existImg(newsInDB[0].imgPath)

        expect(existNewsImg).toBeTruthy()
        expect(elementsInDB).toHaveLength(1)

        elementsInDB.map(async(val)=>{
            const exists = await existImg(val.imgPath)
            expect(exists).toBeTruthy()
        })
    })
    it("When attempting to delete, if no ID is provided, nothing should be deleted.",async()=>{
        const user = persons[0]
        const token = jwt.sign({user_id:user.id},secret)
        const mockFS = jest.spyOn(fs,'unlink')
        const mockDB = jest.spyOn(Elements,'destroy')
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        

        expect(response.body.message).toEqual( 'ID is required' )
        expect(response.status).toEqual(400)
        expect(mockFS).toHaveBeenCalledTimes(0)
        expect(mockDB).toHaveBeenCalledTimes(0)
    
    })
    it("When only one ID is provided, only the corresponding item should be deleted.",async()=>{
        const user = persons[0]
        const referedElement = elements[0].id
        const referedNews = news[0].id
        const token = jwt.sign({user_id:user.id},secret)
        const mockFS = jest.spyOn(fs,'unlink')
     
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( [referedElement])})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        const newsInDB = await News.findAll({where:{id:referedNews}})
        const elementsInDB = await Elements.findAll({where:{news_id:referedNews}})
        
        expect(newsInDB).toHaveLength(1)
        const existNewsImg = await existImg(newsInDB[0].imgPath)

        expect(existNewsImg).toBeTruthy()
        expect(elementsInDB).toHaveLength(1)

        expect(mockFS).toHaveBeenCalledTimes(1)
    })
    it("When attempting to delete an item that has already been deleted, an error should be returned.",async()=>{
       
        const user = persons[0]
        const referedElement = elements[0].id
        const referedNews = news[0].id
        const token = jwt.sign({user_id:user.id},secret)
        const mockFS = jest.spyOn(fs,'unlink')
      
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( [referedElement])})

    
        expect(response.status).toEqual(400)
        expect(mockFS).toHaveBeenCalledTimes(0)
    })
    it("When attempting to delete multiple elements, they should be successfully deleted.",async()=>{
       
        const user = persons[1]
        const referedElement = [elements[4].id,elements[5].id]
        const referedNews = news[2].id
        const token = jwt.sign({user_id:user.id},secret)
        const mockFS = jest.spyOn(fs,'unlink')
        
     
        const response = await request(app)
        .delete('/admin/news/elements/destroy')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        .send({'elements_ids': JSON.stringify( referedElement)})

        expect(response.body.message).toEqual('Sucess')
        expect(response.status).toEqual(201)
        

        const findElements =  await Elements.findAll({where:{news_id:referedNews}})

        expect(findElements).toHaveLength(0)
        expect(mockFS).toHaveBeenCalledTimes(2)
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