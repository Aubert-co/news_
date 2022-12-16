import {expect}  from 'chai';
import request  from 'supertest';
import server  from '../serve'
import fs  from 'fs'
import modelNews  from '../model/DB'
var app,id,img_Path,categoryNews;
describe("apis",()=>{

    beforeAll(async()=>{
        app =  server.listen(8081)
      /*  console.log("saveDB")
        const title = "test"
        const category = "category_test"
        const content = 'um teste simples'
        const id = 75
        const imgName = "test"
        const imgPath = "C:/Users/Black/Desktop/News/test/test.jpg"
        modelNews.create({
            title,category,content,id,imgName,imgPath
        })*/
    })
   
      
        
    
    describe("api insert",()=>{
        test("should return a sucessfull msg",async()=>{
            const response = await request(app)
            .post('/insert')
            .set({'Content-type':'application/json'})
       
            .attach('file','C:/Users/Black/Desktop/News/test/test.jpg')
            .field('content','uma captura de tela')
            .field('title','testinsert')
            .field('category','games')

            const datas =  await modelNews.findOne({where:{title:'testinsert'}})
            const {content,title,category,imgName,imgPath}  =  datas
            expect(response.body.msg).to.be.equal('sucess')
            expect(response.statusCode).to.be.equal(200)
            expect(content).to.equal('uma captura de tela')
            expect(title).to.equal('testinsert')
            expect(category).to.equal('games')
            expect(imgName).to.equal('test')
            id = datas.id
            img_Path = imgPath
            categoryNews = category
        })
    })
   
    describe("api get onenews",()=>{
        test("should return a array",async()=>{
       
            const response = await request(app)
            .get(`/news/${id}`)

            expect(response.body.msg).to.be.equal('sucess')
            expect(response.body.datas).to.be.an('object')
        })
    })
    describe("api get onenews",()=>{
        test("should return a array emptiy when send a non existent id in DB",async()=>{

            const response = await request(app)
            .get(`/news/1000`)

            console.log(response.body.datas)
            expect(response.body.msg).to.be.equal('sucess')
            expect(response.body.datas.length).to.be.equal(0)
        })
    })
    
   /* describe('api update without file',()=>{
        test("update news",async()=>{
            const response = await request(app)
            .post('/update')
            .set({'Content-type':'application/json'})
            .field('id',id)
            .field('content','testando')
            .field('title','not a captura')
            .field('category','animal')
            
            const {content,title,category,imgName,imgPath} =await modelNews.findOne({where:{id}})
            
            expect(response.body.msg).to.be.equal('sucess')
            expect(content).to.be.equal('testando')
            expect(title).to.be.equal('not a captura')
            expect(category).to.be.equal('animal')
            expect(imgName).to.be.equal('test2')
            expect(img_Path).to.be.equal(imgPath)
          
            
        })
    })*/
    describe('api update',()=>{
        test("update news",async()=>{
            const response = await request(app)
            .post('/update')
            .set({'Content-type':'application/json'})
        
            .attach('file','C:/Users/Black/Desktop/News/test/test2.jpg')
            .field('id',id)
            .field('content','testando')
            .field('title','not a captura')
            .field('category','animal')
            
            const {content,title,category,imgName,imgPath} =await modelNews.findOne({where:{id}})
            
            expect(response.body.msg).to.be.equal('sucess')
            expect(content).to.be.equal('testando')
            expect(title).to.be.equal('not a captura')
            expect(category).to.be.equal('animal')
            expect(imgName).to.be.equal('test2')
            expect(img_Path).to.be.equal(imgPath)
          
            
        })
    })
    describe("api category",()=>{
        test("category news",async()=>{
            const response = await request(app)
            .get(`/category/${categoryNews}`)

            expect(response.body.msg).to.be.equal('sucess')
        })
    })
    describe("api delete",()=>{
        test("delete news",async()=>{

            const response = await request(app)
            .delete('/delete')
            .set({'Content-type':'application/json'})
            .send({id})
            const path = img_Path.replace('./public/','./')
            const falsePath = fs.existsSync(path)
         
            expect(response.body.msg).to.be.equal('sucess')
            expect(falsePath).to.be.equal(false)
        })
    })
   
    describe("api category",()=>{
        test("category news",async()=>{
            const response = await request(app)
            .get(`/category/polician`)

            expect(response.body.msg).to.be.equal('something went wrong')
        })
    })
})