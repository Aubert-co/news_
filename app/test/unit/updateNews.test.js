const {createNews, updateNews} = require('../../controller/saveNews')
const {news}= require('../../model/index')
const body ={id:407,resume:"resumo",title:"titulosavenews",content:"content",
imgPath:"testePath",imgName:"testeimg",category:"games"}

const newValues ={resume:"resumotest",title:"othertitles",content:"conteudo",
imgName:"tesimgname",category:"othergames"}
var globalID
describe("test cases save datas in db",()=>{
    beforeAll(async()=>{
        const inserValuesInDB =  await news.create({...body}).catch((err)=>{throw err})
    })    
    
    afterAll(async()=>{
        const deleteValuesInDB = await news.destroy({where:{id:body.id}}).catch((err)=>{throw err})
    })
    test("function updateNews should update the data correctly in DB",async()=>{
        newValues.id = body.id
        try{
            const updateNewsFunction= await updateNews(newValues)
           
            const datas = await news.findOne({where:{id:body.id}})
            const {id,imgName,imgPath,content,resume,title,category} =datas.dataValues 
            expect(newValues.title).toBe(title)
            expect(newValues.category).toBe(category)
            expect(newValues.imgName).toBe(imgName)
            expect(newValues.content).toBe(content)
            expect(newValues.resume).toBe(resume)
            expect(body.imgPath).toBe(imgPath)
        }catch(err){
            throw err
        }
    })
    
})
