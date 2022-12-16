import {expect}  from 'chai';
import request  from 'supertest';
import server  from '../serve'
import fs  from 'fs'
import modelNews  from '../model/DB'
var app,id,img_Path,categoryNews,false_title;
describe("apis",()=>{

    beforeAll(async()=>{
        app =  server.listen(8082)
 
        false_title = "test"
        const category = "category_test"
        const content = 'um teste simples'
        id = 75
        const imgName = "test"
        const imgPath = "C:/Users/Black/Desktop/News/test/test.jpg"
        modelNews.create({title,category,content,id,imgName,imgPath})
    })
       describe('api update without file',()=>{
        test("update news",async()=>{
            const response = await request(app)
            .post('/update')
            .set({'Content-type':'application/json'})
            .field('id',id)
            .field('content','testando')
            .field('category','animal')
            
            const {content,title,category,imgName,imgPath} =await modelNews.findOne({where:{id}})
            
            expect(response.body.msg).to.be.equal('sucess')
            expect(content).to.be.equal('testando')
            expect(title).to.be.equal(false_title)
            expect(category).to.be.equal('animal')
            expect(imgName).to.be.equal('test2')
            expect(imgPath).to.be.equal(imgPath)
          
            
        })
    })
    afterAll(async()=>{
        modelNews.destroy({where:{id}})
    })
})