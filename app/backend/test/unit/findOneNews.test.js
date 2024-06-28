const {createNews, updateNews, findOneNews} = require('../../controller/saveNews')
const {news}= require('../../model/index')
const body ={id:407,resume:"resumo",title:"titulosavenews",content:"content",
imgPath:"testePath",imgName:"testeimg",category:"games"}

var globalID
describe("test cases save datas in db",()=>{
    
    afterAll(async()=>{
        try{
            const deleteValuesInDB = await news.destroy({where:{title:body.title}})
          
        }catch(err){
            throw err
        }
    })
    test("function createNews should save the data correctly in DB",async()=>{
        try{
          
            const SaveDatasInDb = await createNews(body)
            const SavedDatasInDb = await news.findOne({where:{title:body.title}})
            const {id,title,resume,content,imgPath,imgName,category} = SavedDatasInDb.dataValues
            globalID =id
            expect(body.title).toBe(title)
            expect(body.resume).toBe(resume)
            expect(body.content).toBe(content)
            expect(body.imgPath).toBe(imgPath)
            expect(body.imgName).toBe(imgName)
            expect(body.category).toBe(category)
        }catch(err){
           throw err
        }
    })
  
    
    test("function findOneNews should return a data array when send a valid id",async()=>{
       
        try{
            const functionFindOneNews= await findOneNews(globalID)
           
            const {id,imgName,imgPath,content,resume,title,category} =functionFindOneNews 
            
            expect(functionFindOneNews)
            expect(id).toBe(body.id)
            expect(title).toBe(body.title)
            expect(category).toBe(body.category)
            expect(imgName).toBe(body.imgName)
            expect(content).toBe(body.content)
            expect(resume).toBe(body.resume)
            expect(imgPath).toBe(body.imgPath)
        }catch(err){
            throw err
        }
    })
    
})
