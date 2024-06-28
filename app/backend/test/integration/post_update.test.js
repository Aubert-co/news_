const request  =require( 'supertest');
const server  =require( '../../serve')
const fs  =require( 'fs')
const {news}  =require( '../../model/index')
const { savesFileImg } = require('../../controller/saveNews');

var app,img_Path

const body = {id:2,
    content:'testandoupdate',category:'test',title:'updateAvalue',imgPath:'',
    imgName:'imgupdate.jpg'
}
const updateValues = {content:'testing',title:'newTitle',category:'all',imgName:'imgupdate2',
file:'C:/Users/Black/Desktop/News/test/imgupdate2.jpg'}

const insertValues = async()=>{
        try{
            const img = 'C:/Users/Black/Desktop/News/test/imgupdate.jpg'
            const buffer = fs.readFileSync(img)
            const {imgName,imgPath} =  savesFileImg({name:body.imgName,data:buffer})
            img_Path =imgPath
            body.imgPath = imgPath
            
            const datas = await news.create({...body})
        }catch(err){
            throw err
        }
}
const deleteValues = async(id)=>{
    try{    
        const findValues = await news.findOne({where:{id:body.id}})
        const {imgPath} = findValues.dataValues
        const deleteValues = await news.destroy({where:{id:body.id}})
        const deleteImg = fs.unlinkSync(img_Path)
    
        if(fs.existsSync(imgPath))throw new Error('img exists')
    }catch(err){
        throw err
    }
}
describe("test cases api /update",()=>{

        beforeAll(async()=>{
            app =  server.listen(8082)
        })
        beforeEach(async()=>{
            await insertValues()
        })  
        afterEach(async()=>{
           await deleteValues()
        })
        test("api update without file should return sucess",async()=>{
            try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                    .field('title',updateValues.title)
                    .field('category',updateValues.category)
                    .field('content',updateValues.content)
                    
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues
            
                expect(response.statusCode).toBe(201)
                expect(content).toBe(updateValues.content)
                expect(title).toBe(updateValues.title)
                expect(category).toBe(updateValues.category)
                expect(body.imgName).toBe(imgName)
                expect(body.imgPath).toBe(imgPath)
                expect(body.content).not.toBe(content)
                expect(body.title).not.toBe(title)
                expect(body.category).not.toBe(category)
            }catch(err){
                throw err
            }
        })
    
        test("api update should return sucess when send a file to update",async()=>{
          try{
                const file = 'C:/Users/Black/Desktop/News/test/imgupdate2.jpg'
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .attach('file',file)
                    .field('id',body.id)
                    .field('content',updateValues.content)
                    .field('title',updateValues.title)
                    .field('category',updateValues.category)
                
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues
                const fileExist = fs.existsSync(imgPath) 
                expect(response.statusCode).toBe(201)
                expect(content).toBe(updateValues.content)
                expect(title).toBe(updateValues.title)
                expect(category).toBe(updateValues.category)
                expect(imgName).toBe(updateValues.imgName)
                expect(body.imgName).not.toBe(imgName)
                expect(body.imgPath).not.toBe(file)
                expect(fileExist).toBeTruthy()
          }catch(err){
            throw err
          }  
    
        })
  
        test('when a value is not sent it mus remain the same should return sucess',async()=>{
            try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues

                expect(response.statusCode).toBe(201)
                expect(body.content).toBe(content)
                expect(body.title).toBe(title)
                expect(body.category).toBe(category)
                expect(body.imgName).toBe(imgName)
                expect(body.imgPath).toBe(imgPath)
            }catch(err){
                throw err
            }
        })
        test('when only category is sent the others values must to be the same should return sucess',async()=>{
           try{
                const newValues = {category:'sports'}
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                    .field('category',newValues.category)
                    
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues

                expect(response.statusCode).toBe(201)
                expect(content).toBe(body.content)
                expect(title).toBe(body.title)
                expect(category).toBe(newValues.category)
                expect(imgName).toBe(body.imgName)
                expect(body.imgPath).toBe(imgPath)
                expect(category).not.toBe(body.category)
           }catch(err){
            throw err
           }
        })
        test('when only title is sent the others values must to be the same should return sucess',async()=>{
           try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                    .field('title',updateValues.title)

                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues

                expect(response.statusCode).toBe(201)
                expect(content).toBe(body.content)
                expect(title).toBe(updateValues.title)
                expect(category).toBe(body.category)
                expect(imgName).toBe(body.imgName)
                expect(imgPath).toBe(body.imgPath)
                expect(title).not.toBe(body.title)
           }catch(err){
            throw err
           }
        })
        test('when sent an id that does not exist',async()=>{
            try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id+1)
                    .field('title','testandotitle123')
                
                const datas = await news.findOne({where:{id:body.id}})
              
 
                expect(response.statusCode).toBe(400)
                expect(response.body).not.toHaveProperty('data')
            }catch(err){
             throw err
            }
         })
         test('when category is not send should update the values and return a status 201',async()=>{
            try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                    .field('content','testando')
                    .field('title','blabla')
                    
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues
    
                expect(response.statusCode).toBe(201)
                expect(content).toBe('testando')
                expect(title).toBe('blabla')
                expect(category).toBe(body.category)
                expect(imgName).toBe(body.imgName)
                expect(img_Path).toBe(imgPath)
           
            }catch(err){
             throw err
            }
         })
         test('when send an invalid category should return status 400',async()=>{
            try{
                const response = await request(app)
                    .post('/update')
                    .set({'Content-type':'application/json'})
                    .field('id',body.id)
                    .field('content','testando')
                    .field('category','blabla')
                
                const datas = await news.findOne({where:{id:body.id}})
                const {content,title,category,imgName,imgPath} =datas.dataValues
    
                expect(response.statusCode).toBe(400)
                expect(content).toBe(body.content)
                expect(title).toBe(body.title)
                expect(category).toBe(body.category)
                expect(imgName).toBe(body.imgName)
                expect(img_Path).toBe(imgPath)
           
            }catch(err){
             throw err
            }
         })
})