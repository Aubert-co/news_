const { existImg ,createPathImg,savesImg} = require('../helpers/saveFiles')
const path = require('path')
const fs = require('fs').promises
const persons =[
    {id:1,name:'lucas',password:'134334',imgPath:'./lucas'},
    {id:2,name:'jose',password:'134334elasd',imgPath:'./jose'},
    {id:3,name:'maria',password:'teste123',imgPath:'./maria'},
]


const news = [
    {id:1,creator:1,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
    {id:2,creator:1,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
    {id:3,creator:2,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
    {id:4,creator:2,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
    {id:5,creator:3,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
    {id:6,creator:3,resume:'lorem iptsu',imgPath:'./resume',title:'title and resume'},
]

const elements = [
    {id:10,news_id:1,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:11,news_id:1,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:12,news_id:2,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:13,news_id:2,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:14,news_id:3,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:15,news_id:3,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:16,news_id:4,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:17,news_id:4,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:18,news_id:5,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:19,news_id:5,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:20,news_id:6,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:21,news_id:6,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
]


async function DeleteAllFiles(){
    const directoryPath =  "./testpublic/"
    const files = await fs.readdir(directoryPath);
        
    for (const file of files) {
        const filePath = directoryPath+file
        const exists = await existImg(filePath)
        if (exists) {
            await fs.unlink(filePath)    
        }
    }
}
async function NewsWithTruImg (array){
 
    for(const val of array){
        const file2 =  path.join(__dirname,'imgupdate.jpg')
        const data = await fs.readFile(file2)
        const files ={name:'imgupdate.jpg',data}
        const {imgName,imgPath,extension} = createPathImg(files)
        await  savesImg(files,imgPath)
        val.imgPath = imgPath
        
    }
   return array
}


module.exports = {persons,news,elements,DeleteAllFiles,NewsWithTruImg}