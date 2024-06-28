const request  =require( 'supertest');
const server  =require( '../../serve')
const fs  =require( 'fs')
const {news}  =require( '../../model/index');
const { savesFileImg } = require('../../controller/saveNews');

var app,img_Path

const body ={id:1000,resume:"get_news",title:"get_title",content:"get_content",imgPath:"get_testePath",imgName:"get_testeimg",category:"get_games"}

const insertValues = async()=>{
    const files = 'C:/Users/Black/Desktop/News/test/imgupdate.jpg'
    const name = 'imgupdate.jpg'
    const data = fs.readFileSync(files)
    const {imgName,imgPath} =  savesFileImg({name,data})
    img_Path =imgPath
    body.imgName = imgName
    body.imgPath = imgPath
    const datas = await news.create({...body}).catch((err)=>{throw err})
      
}
const deleteValues = async()=>{
    try{
        const findDatas = await news.findOne({where:{id:body.id}})
        const existeFile = fs.existsSync(img_Path)

        if(findDatas)await news.destroy({where:{id:body.id}})
        if(existeFile)fs.unlinkSync(img_Path)
    }catch(err){
        throw err
    }
}
describe("tests cases api DELETE/delete",()=>{
    beforeAll(async()=>{
        app = server.listen(8089)
    })
    beforeEach(async()=>{
        await insertValues()
    })
    afterEach(async()=>{
       await deleteValues()
    })
    afterAll(async()=>{
       await deleteValues()
    })
    test('must delete the items from the database when sending a valid id',async()=>{
        try{
            const response =await request(app)
            .delete('/delete')
            .set({'Content-type':'application/json'})
            .send({id:body.id})

       
            const findDatas = await news.findOne({where:{id:body.id}})
        
            const existeFile = fs.existsSync(body.imgPath)
            expect(response.statusCode).toBe(200)
            expect(findDatas).toBe(null)
            expect(existeFile).toBeFalsy()
        }catch(err){
            throw err
        }
    })
    test('must delete the items from the database when sending an id.toString()',async()=>{
        try{
            const response =await request(app)
            .delete('/delete')
            .set({'Content-type':'application/json'})
            .send({id:body.id.toString()})

      
            const findDatas = await news.findOne({where:{id:body.id}})
        
            const existeFile = fs.existsSync(body.imgPath)
            expect(response.statusCode).toBe(200)
            expect(findDatas).toBe(null)
            expect(existeFile).toBeFalsy()
        }catch(err){
            throw err
        }
    })
    test('must not delete items when submitting an invalid id',async()=>{
        try{
            const response =await request(app)
            .delete('/delete')
            .set({'Content-type':'application/json'})
            .send({id:`${body.id}e`})

            const findDatas = await news.findOne({where:{id:body.id}})  
            const existeFile = fs.existsSync(body.imgPath)
            expect(response.statusCode).toBe(400)
            expect(existeFile).toBeTruthy()
        }catch(err){
            throw err
        }
    })
   
})