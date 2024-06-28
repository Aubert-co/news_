const request  =require( 'supertest');
const server  =require( '../../serve')
const fs  =require( 'fs')
const {news} = require('../../model/index')
var app,id,img_Path,categoryNews;
const body ={id:501,resume:"get_news",title:"get_title",content:"get_content",
imgPath:"get_testePath",imgName:"get_testeimg",category:"get_games"}

describe("apis",()=>{

    beforeAll(async()=>{
            app =  server.listen(8081)
        
            const inserValues = await news.create({...body}).catch((err)=>{throw err})
    })
    test('api GET/news/:id should return status 200 when send a valid id',async()=>{
  
            const response = await request(app)
            .get(`/news/${body.id}`).catch((err)=>{throw err})

            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('datas')
            expect(response.body.datas.title).toBe(body.title)
            expect(response.body.datas.resume).toBe(body.resume)
            expect(response.body.datas.content).toBe(body.content)
            expect(response.body.datas.imgName).toBe(body.imgName)
            expect(response.body.datas.imgPath).toBe(body.imgPath)
            expect(response.body.datas.category).toBe(body.category)
       
    })
    test('api GET/news/:id  when send an invalid id should return a status 401 and the date field must be empty',async()=>{
      
            const response = await request(app)
            .get(`/news/${body.id+'e'}`).catch((err)=>{throw err})

            expect(response.statusCode).toBe(400)
            expect(response.body).not.toHaveProperty('data')
        
    })
    test('api GET/news/:id when submitted a non-existent id should return success but the date field should be empty',async()=>{
      
        const response = await request(app)
        .get(`/news/${body.id+1}`).catch((err)=>{throw err})

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('datas')
        expect(response.body.datas).toStrictEqual([])
      
    })
    afterAll(async()=>{
       const deleteValues =await  news.destroy({where:{id:body.id}}).catch((err)=>{throw err})
    })
})