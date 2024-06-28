const route = require('express').Router()
const fs =require('fs')
const fileUpload = require('express-fileupload')


const { verifyIdIsAceeptable ,verifyCategorIsAcceptable} = require('../controller/verifyFunctions')
const { createNews,savesFileImg,updateNews,findOneNews,findCategoryNews ,updateFileNews,deleteOneNews, searchNews} =require('../controller/saveNews')



 route
 .get('/news/:id',async(req,res)=>{
    const {id} = req.params
    const checkId = verifyIdIsAceeptable(id)
    if(!checkId)return res.status(400).send({msg:'something went wrong'})
    try{
        const datas = await findOneNews(id)
        res.status(200).send({msg:'sucess',datas})
    }catch(err){
        res.status(404).send({msg:'something went wrong'})
    }
})

.get('/category/:category',async(req,res)=>{
    const {category} = req.params

    const checkCategory = verifyCategorIsAcceptable(category)
    if(!checkCategory)return res.status(400).send({msg:'something went wrong'})
    try{
        const data = await findCategoryNews(category)
        res.status(200).send({msg:'sucess',data})
        
    }catch(err){
        res.status(404).send({msg:'something went wrong'})
    }
})

.delete('/delete',async(req,res)=>{
    const {id} = req.body
    const checkId = verifyIdIsAceeptable(id)
   
    if(!checkId)return res.status(400).send({msg:'something went wrong'})
    try{
        const {imgPath} = await findOneNews(id)

        const existeFile = fs.existsSync(imgPath)
        if(existeFile)fs.unlinkSync(imgPath)
        
        const deleteData = await deleteOneNews(id)
        res.status(200).send({msg:'sucess'})
    }catch(err){
        res.status(404).send({msg:'something went wrong'+err})
    }
})
.post('/search',async(req,res)=>{
    const {category,search} = req.body
    
    const checkCategory = verifyCategorIsAcceptable(category)
    if(!checkCategory)return res.status(400).send({msg:'something went wrong',data:[]})
    try{
        const data = await searchNews(category,search)
  
        res.status(201).send({msg:'sucess',data})
    }catch(err){
        res.status(404).send({msg:'something went wrong'})
    }
})

.post('/update',fileUpload({createParentPath:true}) ,async(req,res)=>{
    const {id,category} = req.body
    const checkId = verifyIdIsAceeptable(id)
    const verifyCategory = verifyCategorIsAcceptable(category)
    
    
    if(category && !verifyCategory || !checkId)return res.status(400).send({msg:'something went wrong'})

    try{
        const datas = await findOneNews(id)
        if(datas.length === 0)return res.status(400).send({msg:'something went wrong'})
        
        if(!req.files){
            const body = req.body
            const saveNews =  await updateNews(body)
            return  res.status(201).send({msg:'sucess'}) 
        }
 
        const ImgPathToUpdate = datas.imgPath
        const Newfile = req.files.file
     
        const {imgName} = updateFileNews(Newfile,ImgPathToUpdate)

       
        const body = {...req.body,imgName}
        const saveNews =  await updateNews(body)
        res.status(201).send({msg:'sucess'})
    }catch(err){
        res.status(401).send({msg:'something went wrong'+err})
    }
})


.post('/insert',fileUpload({createParentPath:true}),async(req,res)=>{

        if(!req.files)return res.status(404).send({msg:'something went wrong'})
        
        const files = req.files.file
        const bodyDatas = req.body
        
    
        const checkCategory = verifyCategorIsAcceptable(bodyDatas.category)
     
        if(!checkCategory)return res.status(404).send({msg:'something went wrong'})
        
        const savedFiles =  savesFileImg(files)
        const {imgName,imgPath} = savedFiles
        
        const existeFile = fs.existsSync(imgPath)
    
        if(!existeFile)return res.status(404).send({msg:'something went wrong'})
        
      
        const objectDatas = {...req.body,imgName,imgPath}
        const SaveDatasInDb = await createNews(objectDatas).catch(error=>error)
        if(SaveDatasInDb instanceof Error)return  res.status(404).send({msg:'something went wrong'+err})

        res.status(201).send({msg:'sucess'})
})


module.exports = route