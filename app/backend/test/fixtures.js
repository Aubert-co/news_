const { existImg } = require('../helpers/saveFiles')
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
    {id:10,news_id:15,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:11,news_id:15,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:12,news_id:16,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:13,news_id:16,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:14,news_id:17,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:15,news_id:17,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:16,news_id:18,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:17,news_id:18,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:18,news_id:19,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:19,news_id:19,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:20,news_id:20,order:1,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
    {id:21,news_id:20,order:2,subtitle:'qetqegqwe',content:'somevalue',imgPath:'./img'},
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
module.exports = {persons,news,elements,DeleteAllFiles}