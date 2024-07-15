const {createPathImg,file_element,savesImg} = require('./saveFiles')

function generateElements({arrayElements,keys,news_id,files}){
    if(!Array.isArray(arrayElements))arrayElements = [arrayElements]
    return arrayElements.map((val,index)=>{
    
        let where = {}
        where.news_id =news_id
        where.order = val.order
        
      
        if(val.order) where.order=val.order 
        if(val.subtitle)where.subtitle = val.subtitle
        if(val.content)where.content = val.content
        
        if( keys ){
            const file = file_element(index+1)
            if(keys.includes(file)){
                const {imgPath} = createPathImg(files[file])
                where.imgPath = imgPath
            }
        }
       
        return where
    })
}
async function saveManyImgs(array,files){
    var index = 1
   for(const val of array){
        if(val.imgPath){
            const imgs = files[file_element(index)]
            
            if(imgs){
                await savesImg(imgs ,val.imgPath) 
            }   
        }
            index+=1
        }
    
}
module.exports = {generateElements,saveManyImgs}