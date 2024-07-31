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

const multExpected = (data1,data2)=>{
    data1 = [data1]
    data1.map((val)=>{
        expect(val.id).toEqual(data2.id)
        expect(val.imgPath).toEqual(data2.imgPath)
        expect(val.title).toEqual(data2.title)
    })
}
const user = persons[0]
describe("apis",()=>{
    beforeEach(()=>{
       
        
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
    it("When the user try to find her news created should return only the news created",async()=>{
      
   
        const news1 = news[0]
        const news2 = news[1]
        const response = await request(app)
        .get('/admin/news')
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        
        expect(response.status).toEqual(200)

        const [resposeDatas1,resposeDatas2] = response.body.datas

        expect(response.body.datas).toHaveLength(2)

       
        multExpected(resposeDatas1,news1)
        multExpected(resposeDatas2,news2)
    })
    it("when the user try to find her elements should return only the ones the news_id has sent",async()=>{
        const news1 = news[0]
        const elements1 = elements[0]
        const elements2 = elements[1]
        const response = await request(app)
        .get(`/admin/elements/news_id=${news1.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization',`Bearer ${token}`)
        
        expect(response.status).toEqual(200)

        const [resposeDatas1,resposeDatas2] = response.body.datas

        expect(response.body.datas).toHaveLength(2)

       
        multExpected(resposeDatas1,elements1)   
        multExpected(resposeDatas2,elements2)
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
            throw err
        }
    })
})