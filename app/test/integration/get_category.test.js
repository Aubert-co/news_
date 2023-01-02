const request  =require( 'supertest');
const server  =require( '../../serve')
const {news} = require('../../model/index')
var app
const body ={id:250,resume:"resumo",title:"titulosavenews",content:"content",
imgPath:"testePath",imgName:"testeimg",category:"games"}

describe("tests API GET/category/:category",()=>{

    beforeAll(async()=>{
        app =  server.listen(8087)
        const inserValues =await  news.create({...body})
    })
    afterAll(async()=>{
        await news.destroy({where:{id:body.id}})
    })
    test('should return status 200 and a date field when submitting a valid category',async()=>{
        try{
            const response = await request(app)
            .get(`/category/games`)
            
            const datas = response.body.data[0]
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('data')
            expect(datas.resume).toBe(body.resume)
            expect(datas.content).toBe(body.content)
            expect(datas.imgName).toBe(body.imgName)
            expect(datas.imgPath).toBe(body.imgPath)
            expect(datas.category).toBe(body.category)
            expect(datas.title).toBe(body.title)
        }catch(err){
            throw err
        }
    })
    test('should return 401 status when submitting an invalid category',async()=>{
       try{
            const response = await request(app)
            .get(`/category/politian`)
            
            expect(response.statusCode).toBe(400)
            expect(response.body).not.toHaveProperty('data')
       }catch(err){
            throw err
       }
    })
    test('should return 200 but date field should be empty',async()=>{
        try{
            const response = await request(app)
            .get(`/category/animals`)
            
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toStrictEqual([])
        }catch(err){
            throw err
        }
    })
})