const route = require('express').Router()
const {Person} = require('../models/index')
const bcrypt = require("bcrypt")
const fileUpload = require('express-fileupload')
const jwt = require('jsonwebtoken')
const {createPathImg,existImg,savesImg} =require('../helpers/saveFiles')
require('dotenv').config()
const secret = process.env.SECRET_JWT

route

.post('/login',async(req,res)=>{
    const {name,password} = req.body
    
    if( !name || ! password )return res.status( 400 ).send({message:'Missing fields'})
  
    try{
        const results = await Person.findOne({where:{name}})
        
        if(!results)return res.status(404).send({ message: 'User not found'});
        
        const {id,password:hashedPassword} = results

        const compare = await bcrypt.compare(password,hashedPassword)
  
        if (!compare) return res.status(401).send({message: 'Invalid data'})

        const token = jwt.sign({ user_id:id },secret, {expiresIn: '1h' });
        
        res.status(200).send({message: "Successful login", token});

    }catch(err){
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})
.post('/register',fileUpload({createParentPath:true}),async(req,res)=>{
    const {name,password} = req.body
    
    if( !name || ! password )return res.status( 400 ).send({message:'Missing fields'})
    
    if (!req.files)return res.status(400).send({ message: 'No image were sent in the request.' });

    try{
        const {file} = req.files
        const {imgPath} = createPathImg(file)
        const hashedPassword = await bcrypt.hash(password,10)
        
        const [,created] =  await Person.findOrCreate({
            where:{name},
            defaults:{name,imgPath,password:hashedPassword}
        })
        if ( !created ) return res.status(404).send({ message: 'User already exists' })

        await savesImg(file,imgPath)

        const isImgCreated = await existImg(imgPath)

        if(!isImgCreated) return res.status(404).send({ message: 'Failed to save the image.' });
    
        
        res.status(201).send({message:'sucess'})
    }catch(err){
        console.log(err)
        res.status(500).send({message:'Oops, something went wrong! Please try again later.'+err})
    }
})

module.exports = route