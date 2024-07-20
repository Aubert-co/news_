const route = require('express')()
const authMidlleware = require('../Middleware/auth')
const {News,Elements, sequelize} = require('../models/index')
const fileUpload = require('express-fileupload')
const {createPathImg,existImg,savesImg,file_element} =require('../helpers/saveFiles')
const { Op } = require('sequelize')
const fs = require('fs').promises
const {generateElements,saveManyImgs} = require('../helpers/index')

route
.use(authMidlleware)
.use( fileUpload({createParentPath:true}) )
.post('/news/create',async(req,res)=>{
    const {user_id} = req.user
    const {title,resume,elements} = req.body
    let keys
    if(!title)return res.status(400).send({ message: 'Title cannot be null.' });

        
    if(req.files)keys  = Object.keys(req.files)
    if(!keys.includes('file-main'))return res.status(400).send({message:'The main article needs a image.'})
    const transaction = await sequelize.transaction()
    try{
        
        const {imgPath} = createPathImg(req.files['file-main'])
        const news =  await News.create({
            imgPath,title,resume,creator:user_id
        },{transaction})
 
        if(!elements){
         
            await Promise.all([savesImg(req.files['file-main'],imgPath)])
            await transaction.commit()
            return res.status(201).send({message:'Sucess'})
        }
       
      
        const arrayElements = JSON.parse(elements)
        
        const newArray  =generateElements({arrayElements,keys,news_id:news.id,files:req.files})
      
        await Promise.all([ 
            Elements.bulkCreate( newArray ,{transaction}),
            savesImg(req.files['file-main'],imgPath),
            saveManyImgs( newArray ,req.files)
         ])
         await transaction.commit()
        res.status(201).send({message:'Sucess'})
    }catch(err){
        await transaction.rollback()
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.put('/news/update',async(req,res)=>{
    const {user_id} = req.body
    const {title,resume,elements,news_id} = req.body
    let keys;
    const whereNews = {}

    if(req.files)keys  = Object.keys(req.files)
    
    if(news_id){
        const findNews = await News.findOne({where:{id:news_id,creator:user_id}})
        if(findNews)return res.status(400).send({message:'News not found'})

        if(title)whereNews.title = title
        if(resume)whereNews.resume = resume
        if(keys.includes('file-main'))whereNews.savesImg = savesImg(req.files['file-main'],findNews.imgPath)
    }
    const updateNews = News.update(whereNews,{id:news_id,creator:user_id})
    if(!elements){
        await Promise.all([updateNews,whereNews.savesImg])
        return res.status(201).send({message:'News updated'})
    }
    const toUpdateElements = JSON.parse( elements )
    const elementsIds = toUpdateElements.filter((val)=>val.id)
    const findElements = await Elements.findALl({where:{
        id:{
            [Op.in]:[elementsIds]
        }
    }})
    
    if(!findElements)return res.status(201).send({message:'News updated'})

    const newValues = toUpdateElements.map((val)=>{
        if(val.id){
            const where = {}
            if(val.order)where.order = val.order
            if(val.subtitle)where.subtitle = val.subtitle
            if(val.content)where.content=val.content

        }
    }) 
})
.delete('/news/destroy',async(req,res)=>{
    const {user_id}= req.user
    const {news_id} = req.body
  
    try {
        if(!news_id)return res.status(500).send({message:'dont have a news id'})
        const findNews = await News.findOne({where:{creator:user_id,id:news_id}})
        
        if(!findNews)return res.status( 500 ).send({message:'error'})
        
        const findElements = await Elements.findAll({where:{news_id}})
        
        const deleteFiles = findElements.map((val)=>{
            const exists = existImg(val.imgPath)
            if(val.imgPath && exists)return fs.unlink(val.imgPath)
            
        })

      
        const existImgNews =await existImg(findNews.imgPath)
        if(existImgNews)deleteFiles.push(fs.unlink(findNews.imgPath))
      
        const deleteNews =  News.destroy({where:{id:news_id,creator:user_id}})
        const deleteElements = Elements.destroy({where:{news_id}})
        await Promise.all([deleteFiles,deleteNews,deleteElements])
        res.status(201).send({message:'Sucess'})
    } catch (err) {
       
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.post('/news/elements/create',async(req,res)=>{
    const {user_id} = req.user
    const {elements,news_id} = req.body
   
    const transaction = await sequelize.transaction()
    try{    
        
        if(!news_id)return res.status(400).send({message:'news_id cannot be null.'})
        const findNews = await News.findOne({where:{id:news_id,creator:user_id}})
        if(!findNews)return res.status(400).send({message:'News not found.'})
        
        if(!elements)return res.status(400).send({message:'Elements cannot be null'})
        let arrayElements = JSON.parse(elements)
        
        if(!req.files){
      
            const newElementsArray = generateElements({arrayElements,news_id:findNews.id})
            await Elements.bulkCreate( newElementsArray ,{transaction})
            await transaction.commit()
            return res.status(201).send({message:'Sucess'})
        }
        const keys  = Object.keys(req.files)
    
        const newElementsArray = generateElements({arrayElements,keys,files:req.files,news_id:findNews.id})
     
        await Promise.all([Elements.bulkCreate( newElementsArray,{transaction}),saveManyImgs(newElementsArray , req.files)])
        await transaction.commit()
        res.status(201).send({message:'Sucess'})
    }catch(err){ 
        await transaction.rollback()
        res.status(500).send({message:'Something went wrong'+err})
    }

})
.delete('/news/elements/destroy',async(req,res)=>{
    const {user_id} = req.user
    const {elements_ids} = req.body
    const ids = JSON.parse(elements_ids )
    const imgs = []
    const t = await sequelize.transaction();
    try{
    if(!ids )return res.status(400).send({message:'need id'})

    const datas= await Elements.findAll({
        include:[{
            model:News,
            as:'news',
            required:true ,
            where:{
                creator:user_id
            }
        }],
        where:{id:{
            [Op.in]:ids
        }}
    })
   
    if(!datas)return res.status(400).send({message:"elements not found"})

    for(const val of datas){
        const exists = await existImg(val.imgPath)

        if(val.imgPath && exists)imgs.push(fs.unlink(val.imgPath))
        
    }
    const deleteElements=  Elements.destroy({
        include:[{
            model:News,
            as:'news',
            required:true ,
            where:{creator:user_id}
        }],
        where:{id:{[Op.in]:ids}}
    },{transaction:t})

    await Promise.all([deleteElements,...imgs])

    await t.commit()

    res.status(201).send({message:'Sucess'})
    }catch(err){
        
        await t.rollback()
        res.status(500).send({message:'Something went wrong'+err})
    }
})
module.exports = route