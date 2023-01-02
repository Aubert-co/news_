const { Op } = require('sequelize')
const {searchNews} = require('../../controller/saveNews')
const {news}= require('../../model/index')


const body ={id:2000,
    resume:"lorem",
    title:"get_title",
    content:"get_content",
    imgPath:"get_testePath",
    imgName:"get_testeimg",
    category:"games"
}
const otherBody ={
    id:2001,
    content:'animalstest',
    category:'animals',
    title:'titleanimal',
    imgName:'animalsgame',
    imgPath:'path/path/animals',
    resume:'lorem'
}
const moreData = {
    id:2002,
    content:'animalstest',
    category:'sports',
    title:'titlesports',
    imgName:'animalsgame',
    imgPath:'path/path/animals',
    resume:'lorem'
}
const insertValues = async()=>{
    try{
        const insertDatas = await news.bulkCreate([{...body},{...otherBody},{...moreData}])
    }catch(err){
        throw 'insert'+err
    }
}
 const deleteValues = async()=>{
    try{
        const deleteItens = await news.destroy({where:{[Op.and]:[{id:body.id},{id:otherBody.id},{id:moreData.id}]},truncate:true})
    }catch(err){
        throw 'delete'+err
    }
}
describe("unit tests function searchNews",()=>{
    beforeAll(()=>{
      insertValues()
    })
    afterAll(()=>{
        deleteValues()
    })
    test("must return an array when sending a category like games and content like get_content",async()=>{
        try{
            const searchValue = await searchNews(body.category,body.content)
            const datas = searchValue[0]
            expect(datas.category).toBe(body.category)
            expect(datas.category).not.toEqual(otherBody.category)
            expect(datas.content).toBe(body.content)
            expect(datas.id).toBe(body.id)
        }catch(err){
            throw err
        }
    })
    test("must return an array when sending a category equal to animals and content equal to animalstest",async()=>{
        try{
            const searchValue = await searchNews(otherBody.category,otherBody.content)
            const datas = searchValue[0]
            expect(datas.category).toBe(otherBody.category)
            expect(datas.category).not.toEqual(body.category)
            expect(datas.content).toBe(otherBody.content)
            expect(datas.id).toBe(otherBody.id)
        }catch(err){
            throw err
        }
    })
    test("should return an empty array when sent an invalid category",async()=>{
        try{
            const searchValue = await searchNews('test',otherBody.content)
            expect(searchValue).toStrictEqual([])
        }catch(err){
            throw err
        }
    })
    test("should return a diversity array when send category all and text que tenha em varios",async()=>{
        try{
            const searchValue = await searchNews('all',otherBody.resume)

            expect(searchValue.length).toStrictEqual(3)
            
        }catch(err){
            throw err
        }
    })
})

