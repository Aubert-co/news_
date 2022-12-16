import ModelNews from './DB.js';
import fs from 'fs'

export const ModelfindOneNews = async(id_news)=>{
    const datas = await ModelNews.findOne({where:{id:id_news}})
    if(datas?.dataValues=== undefined)return []
    return datas.dataValues
}

export const ModelfindCategoryNews = async(category)=>{
    if(category === 'all'){
        const data = await ModelNews.findAll()
        return data
    }
    const data = await ModelNews.findAll({where:{category}})
    return data
}

export const ModeldeleteOneNews = async(id)=>{
    const deleteOneData = await ModelNews.destroy({where:id,truncate:true})     
    return deleteOneData
}
export const ModelcreateNews = async(content,category,title,imgName,imgPath,resume)=>{
    await ModelNews.create({content,category,title,imgName,imgPath,resume})
}

export const ModelsavesFileImg = async(files)=>{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  
    const [imgName,extension] = files.name.split('.')
    const imgPath = './public/'+uniqueSuffix+'.'+extension
    const buffer = Buffer.from(files.data)

    fs.writeFileSync(imgPath,buffer)
    return {imgName,imgPath}
 
}
export const ModelupdateNews = async(body,imgName)=>{
    const {content:oldContent,category:oldCategory,date:oldDate,title:oldTitle,id,resume:oldResume} = body
    const updateValues = {}
    
    if(imgName)updateValues.imgName
    if(oldContent)updateValues.content = oldContent
    if(oldCategory)updateValues.category = oldCategory
    if(oldDate)updateValues.date = oldDate
    if(oldTitle)updateValues.title =oldTitle
    if(oldResume)updateValues.resume = oldResume
   
    await ModelNews.update({...updateValues},{where:{id}})
}