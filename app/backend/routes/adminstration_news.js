const route = require('express')()
const authMidlleware = require('../Middleware/auth')
const {News,Elements} = require('../models/index')
const fileUpload = require('express-fileupload')
const {createPathImg,existImg,savesImg} =require('../helpers/saveFiles')
const fs = require('fs').promises
const file_element = (order)=>`file-element${order}`

route
.use(authMidlleware)
.use( fileUpload({createParentPath:true}) )
.post('/news/create',async(req,res)=>{
    const {user_id} = req.user
    const {title,resume,elements} = req.body
    let keys
    if(!title) return res.status(400).send({message:''})
        
    if(req.files)keys  = Object.keys(req.files)
    if(!keys.includes('file-main'))return res.status(400).send({message:''})

    try{
        
        const {imgPath} = createPathImg(req.files['file-main'])
        const news = await News.create({
            imgPath,title,resume,creator:user_id
        })
        
        const arrayElements = JSON.parse(elements)
        const newArray  = arrayElements.map((val,ind)=>{
            let where = {}
            where.news_id = news.id
            where.order = val.order
            const file = file_element(where.order)
          
            if(val.order) where.order=val.order 
            if(val.subtitle)where.subtitle = val.subtitle
            if(val.content)where.content = val.content
            
            if(keys.includes(file)){
                const {imgPath} = createPathImg(req.files[file])
                where.imgPath = imgPath
            }
           
            return where
        })
        
        
        const promiseFiles =  newArray.map((val)=>{
            if(!val.imgPath)return 
            const files = req.files[file_element(val.order)]
            savesImg(files,val.imgPath)
        })
        const mainImg = savesImg(req.files['file-main'],imgPath)
        await Promise.all([ 
            mainImg,
            Elements.bulkCreate( newArray ),
            promiseFiles
         ])
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.delete('/news/destroy',async(req,res)=>{
    const {user_id}= req.user
    const {news_id} = req.body
    let deleteImgNews;
    try {
        const findNews = await findOne({where:{creator:user_id,id:news_id}})
        if(!findNews)return res.status( 500 ).send({message:'error'})
        
        const findElements = await Elements.findAll({where:{news_id}})
        const deleteFiles = findElements.val((val)=>{
            if(val.imgPath && existImg(val.imgPath))fs.unlink(val.imgPath)
            
        })
        const existImgNews = existImg(findNews.imgPath)
       
        await Promise.all([deleteFiles,fs.unlink(findNews.imgPath)])
        res.status(201).send({message:'Sucess'})
    } catch (error) {
        res.status(500).send({message:'Something went wrong'+err})
    }
})
.delete('/news/elements/destroy',async(req,res)=>{
    const {user_id} = req.user
    const {elements_id} = req.body
    const ids = [...elements_id]

    try{
    const datas= await Elements.findAll({
        include:[{
            model:News,
            as:'news',
            required:true    
        }],
        where:{id:ids,'$news.creator$':user_id}
    })

    const imgs=datas.map((val)=>{
        if(val.imgPath && existImg(val.imgPath))fs.unlink(val.imgPath)
        
    })
    const deleteElements =  Elements.findAll({
        include:[{
            model:News,
            as:'news',
            required:true    
        }],
        where:{id:ids,'$news.creator$':user_id}
    })

    await Promise.all([
        deleteElements, imgs
    ])
    res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})
module.exports = route