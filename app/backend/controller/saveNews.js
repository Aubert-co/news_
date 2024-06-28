const {news} =  require('../model/index');
const  fs = require('fs');
const { Op } = require('sequelize');

const factoryUpdateNews = (body)=>{
    const updateValues = {}
    
    const keys =Object.keys(body)
    const values = Object.values(body)
    keys.map((val,ind)=>{
        if(values[ind] && val !== 'id')updateValues[val] = values[ind]
    })
    return updateValues
}

module.exports = {

    updateFileNews:(NewFile,ImgPathToUpdate)=>{
        if(!NewFile.name || !NewFile.data )return {imgName:undefined}
        const [imgName,extension] = NewFile.name.split('.')
        const Newbuffer = Buffer.from(NewFile.data)
        fs.writeFileSync(ImgPathToUpdate,Newbuffer)
        return {imgName}
    },
    updateNews : async(body)=>{
        const objectValues = factoryUpdateNews(body)
       
        await news.update({...objectValues},{where:{id:body.id}})
    },
    savesFileImg : (files)=>{
        if(!files.name || !files.data)return {imgName:undefined,imgPath:undefined}
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const [imgName,extension] = files.name.split('.')
        const imgPath = './public/'+uniqueSuffix+'.'+extension
        const buffer = Buffer.from(files.data)
    
        fs.writeFileSync(imgPath,buffer)
        return {imgName,imgPath}
     
    },
     createNews : async(body)=>{
        await news.create({...body})
    },
    deleteOneNews : async(id)=>{
        const deleteOneData = await news.destroy({where:{id},truncate:true})     
        return deleteOneData
    },
    findCategoryNews : async(category)=>{
        if(category === 'all'){
            const data = await news.findAll()
            return data
        }
        const data = await news.findAll({where:{category}})
        return data
    },
    findOneNews : async(id_news)=>{
        const datas = await news.findOne({where:{id:id_news}})
   
        if(datas?.dataValues=== undefined)return []
        return datas.dataValues
    },
    searchNews : async(category,search)=>{
       
        const like = `${search}%`
        const where = {
            [Op.or]:[
            {title:{[Op.like]:like}},
            {content:{[Op.like]:like}},
            {resume:{[Op.like]:like}}
        ]
        }
    
        if(category !== 'all')where.category = category
        const data = await news.findAll({where:{...where}})
 
        return data
    }
    
}