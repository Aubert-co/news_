const request  =require( 'supertest');
const server  =require( '../../serve')
const fs  =require( 'fs')
const {news}  =require('../../model/index');

var app,ids,img_Path;
const statusCodeSucess = 201
const insertValues = async()=>{
   
        const datas= await news.findOne({where:{title:'testinsert'}}).catch((err)=>{throw err})
        if(datas?.dataValues){
            const {id,imgPath} = datas.dataValues
            const deletePath =fs.existsSync(imgPath)
            if(deletePath) fs.unlinkSync(imgPath)
        }

}
const deleteValues = async()=>{
     
        const datas = await news.findOne({where:{title:'testinsert'}}).catch((err)=>{throw err})
        if(datas?.dataValues){
            await news.destroy({where:{id:datas.dataValues.id}})
            const deletePath =fs.existsSync(datas.dataValues.imgPath)
            if(deletePath) fs.unlinkSync(datas.dataValues.imgPath)
        }
    
}
    describe("test cases api update",()=>{
        beforeAll(async()=>{
            app =  server.listen(8084)
            insertValues()
        })
        afterEach(async()=>{
            deleteValues()
        })
       afterAll(()=>{
            if(fs.existsSync(img_Path))fs.unlinkSync(img_Path)
        })
        test("should return a sucessfull msg when send correct valus",async()=>{
            try{
                const response = await request(app)
                .post('/insert')
                .set({'Content-type':'application/json'})
        
                .attach('file','C:/Users/Black/Desktop/News/test/imgupdate.jpg')
                .field('content','uma captura de tela')
                .field('title','testinsert')
                .field('category','games')

    
                const datas = await news.findOne({where:{title:'testinsert'}})
                const {content,title,category,imgName,imgPath,id}  =  datas.dataValues
                img_Path = imgPath
                ids = id
                expect(response.body.msg).toBe('sucess')
                expect(response.statusCode).toBe(statusCodeSucess)
                expect(content).toBe('uma captura de tela')
                expect(title).toBe('testinsert')
                expect(category).toBe('games')
                expect(imgName).toBe('imgupdate')
                expect(fs.existsSync(imgPath)).toBeTruthy()
            }catch(err){
                throw err
            }
     
        })
  
        
        test("should return an error when not send a image",async()=>{
            try{
                const response = await request(app)
                .post('/insert')
                .set({'Content-type':'application/json'})
        
                .attach('file','')
                .field('content','uma captura de tela')
                .field('title','testinsert2')
                .field('category','games')

                const datas =  await news.findOne({where:{title:'testinsert2'}})
            
                expect(response.statusCode).toBe(404)
                expect(datas).toBeNull()
            }catch(err){
                throw err
            }
        })
      
})