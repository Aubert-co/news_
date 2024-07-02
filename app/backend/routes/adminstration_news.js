const route = require('express')()
const authMidlleware = require('../Middleware/auth')
const {News,Elements} = require('../models/index')
const fileUpload = require('express-fileupload')
const {createPathImg,existImg,savesImg} =require('../helpers/saveFiles')

const file_element = (order)=>`file-element${order}`

route
.use(authMidlleware)



.post('/news/create',fileUpload({createParentPath:true}),async(req,res)=>{
    const {user_id} = req.user

   
    const {title,resume,elements} = req.body
    let keys
    if(!title) return res.status(400).send({message:''})
        
  
  
    if(req.files)keys  = Object.keys(req.files)
    if(!keys.includes('file-main'))return res.status(400).send({message:''})

  
    try{
        
        let {imgPath} = createPathImg(req.files['file-main'])
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
        
        
        const promiseFiles =  newArray.map(async(val)=>{
            const files = req.files[file_element(val.order)]
            savesImg(files,val.imgPath)
        })
        await Promise.all([ 
            Elements.bulkCreate( newArray ),
            promiseFiles
            , savesImg(req.files['file-main'],imgPath)
         ])
        res.status(201).send({message:'Sucess'})
    }catch(err){
        res.status(500).send({message:'Something went wrong'+err})
    }
})
module.exports = route