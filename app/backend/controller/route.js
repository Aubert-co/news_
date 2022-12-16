import express from 'express'
import fs from 'fs'
import Filesupload from 'express-fileupload'

import { ModelcreateNews, ModeldeleteOneNews, ModelfindCategoryNews, ModelfindOneNews, ModelsavesFileImg, ModelupdateNews } from '../model/modelFunctions.js'

const fileupload = Filesupload
const route =express.Router()

 route
 .get('/news/:id',async(req,res)=>{
    const {id} = req.params
    if(isNaN(id) || id=== null || id=== undefined)return res.status(404).send({msg:'something went wrong'})

    try{
        const datas = await ModelfindOneNews(id)
        res.status(200).send({msg:'sucess',datas})
    }catch(err){
        res.status(401).send({msg:'something went wrong'+err})
    }
})
.get('/category/:category',async(req,res)=>{
    const {category} = req.params
    const categoryAccepted = ['games','animals','sports','all']
    const verifyCategory = categoryAccepted.indexOf(category) 
    if(verifyCategory === -1)return res.status(404).send({msg:'something went wrong'})
    
    try{
        const data = await ModelfindCategoryNews(category)
        res.status(200).send({msg:'sucess',data})
    }catch(err){
        res.status(401).send({msg:'something went wrong'+err})
    }
})

.delete('/delete',async(req,res)=>{
    const {id} = req.body
    
    if(isNaN(id) || id=== null || id=== undefined)return res.status(404).send({msg:'something went wrong'})
   
    try{
        const {imgPath} = await ModelfindOneNews(id)
        fs.unlinkSync(imgPath)
        const existeFile = fs.existsSync(imgPath)
        if(existeFile)return res.status(404).send({msg:'something went wrong'})
        
        const deleteData = await ModeldeleteOneNews(id)
        res.status(200).send({msg:'sucess'})
    }catch(err){
        res.status(401).send({msg:'something went wrong'+err})
    }
})

.post('/update',fileupload({createParentPath:true}) ,async(req,res)=>{
    const {id} = req.body

    try{
        const datas = await ModelfindOneNews(id)
        if(datas.length === 0)return res.status(404).send({msg:'something went wrong'+'id not found'})
        
        if(!req.files){
            const body = req.body
            const ModelUpdateNews =  await ModelupdateNews(body)
            return  res.status(200).send({msg:'sucess'}) 
        }
       
        const oldImgPath = datas.imgPath
        const files = req.files.file
   
        const [imgName,extension] = files.name.split('.')
   
        const buffer = Buffer.from(files.data)
        fs.writeFileSync(oldImgPath,buffer)
       
        const body = req.body
        const ModelUpdateNews =  await ModelupdateNews(body,imgName)
        res.status(200).send({msg:'sucess'})
    }catch(err){
      
        res.status(401).send({msg:'something went wrong'+err})
    }
})


.post('/insert',fileupload({createParentPath:true}),async(req,res)=>{
    try{
        
        if(!req.files)return res.status(401).send({msg:'somethin went wrong'})
        
        const files = req.files.file
        const {content,category,title,resume} = req.body
        const savedFiles = await ModelsavesFileImg(files)
        const {imgName,imgPath} = savedFiles
        
        const existeFile = fs.existsSync(imgPath)
    
        if(!existeFile)return res.status(404).send({msg:`${existeFile} ${imgName} ${imgPath}`})

        const SaveDatasInDb = await ModelcreateNews(content,category,title,imgName,imgPath,resume)
        res.status(200).send({msg:'sucess'})
        
    }catch(err){
        res.status(401).send({msg:'something went wrong'+err})
        
    }
})
export default route

  /* const form = new formidable.IncomingForm()
        console.log(form)
        form.parseasync(req,async(errror,fields,file)=>{
         if(errror)res.send({msg:'something went wrong',status:404})

         const {content,category,title,resume} = fields
         

         var filepath = file.fileupload.filepath;
   
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
         var imgPath = './public';
         const [imgName,extension] =  file.fileupload.originalFilename.split('.')
         imgPath +="/" +uniqueSuffix+'.'+extension;
         
         fs.renameSync(filepath, imgPath)
         if( fs.existsSync(imgPath)){
           const SaveDatasInDb = await ModelNews.create({
             content,category,title,imgName,imgPath,
             resume
           })
           console.log('existe e foi salvo')
           return  res.status(200).send({msg:'sucess'})
         }
         res.status(404).send({msg:'algo deu errado'})
         console.log('algo deu errado')
       });*/