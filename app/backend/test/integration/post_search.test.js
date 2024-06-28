const request  =require( 'supertest');
const server  =require( '../../serve')
const fs  =require( 'fs')
const {news}  =require('../../model/index');
const { Op } = require('sequelize');

var app,ids,img_Path;
const statusCodeSucess = 201

    describe("test cases api update",()=>{
        beforeAll(async()=>{
            app =  server.listen(8095)
        })
      
        test("should return a sucessfull msg and datas array when send a valid category",async()=>{
            try{
                const response = await request(app)
                .post('/search')
                .set({'Content-type':'application/json'})
                .send({category:'games',search:'bla'})

                const datas = response.body.data
            
                expect(response.statusCode).toBe(201)
                expect(datas).toStrictEqual([])
            }catch(err){
                throw err
            }
     
        })
  
        
        test("should return a status 400 when send an invalid category",async()=>{
            try{
                const response = await request(app)
                .post('/search')
                .set({'Content-type':'application/json'})
                .send({category:'not',search:'lorem'})
    
                const datas = response.body.data
                expect(response.statusCode).toBe(400)
                expect(datas).toStrictEqual([])
            }catch(err){
                throw err
            }
        })
      
})