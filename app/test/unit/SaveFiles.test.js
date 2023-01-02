const {createNews, savesFileImg,updateFileNews} = require('../../controller/saveNews')

const fs = require('fs')

var globalImgPath
describe("tests cases safe files",()=>{
    afterEach(()=>{
        const existeFile = fs.existsSync(globalImgPath)
        if(existeFile)fs.unlinkSync(globalImgPath)
    })
    afterAll(async()=>{
        try{
            const existeFile = fs.existsSync(globalImgPath)
            if(existeFile)fs.unlinkSync(globalImgPath)
          
        }catch(err){
            throw err
        }
    })
   
    test("savesFileImg should return sucess when send a file with name and data",()=>{
        const img = "C:/Users/Black/Desktop/News/test/imgupdate.jpg"
        const data = fs.readFileSync(img)
        const files ={name:'imgupdate.jpg',data}
        const {imgName,imgPath} = savesFileImg(files)

        const existeFile = fs.existsSync(imgPath)
        expect(imgName).toBe('imgupdate')
        expect(existeFile).toBeTruthy()
        globalImgPath = imgPath
    })
    test("savesFileImg should return undefined when send a file without name and data",()=>{
        const img = "C:/Users/Black/Desktop/News/test/imgupdate.jpg"
        const data = fs.readFileSync(img)
        const files ={}
        const {imgName,imgPath} = savesFileImg(files)

        const existeFile = fs.existsSync(imgPath)
        expect(imgName).toBeUndefined()
        expect(existeFile).toBeFalsy()
        expect(imgPath).toBeUndefined()
       
    })
    test("savesFileImg should return undefined when send a file without name ",()=>{
        const img = "C:/Users/Black/Desktop/News/test/imgupdate.jpg"
        const data = fs.readFileSync(img)
        const files ={data}
        const {imgName,imgPath} = savesFileImg(files)

        const existeFile = fs.existsSync(imgPath)
        expect(imgName).toBeUndefined()
        expect(existeFile).toBeFalsy()
        expect(imgPath).toBeUndefined()
       
    })
    test("savesFileImg should return undefined when send a file without data ",()=>{
        const img = "C:/Users/Black/Desktop/News/test/imgupdate.jpg"
        const data = fs.readFileSync(img)
        const files ={name:img}
        const {imgName,imgPath} = savesFileImg(files)

        const existeFile = fs.existsSync(imgPath)
        expect(imgName).toBeUndefined()
        expect(existeFile).toBeFalsy()
        expect(imgPath).toBeUndefined()
       
    })
  
    test("updateFileNews should update an existing file should return the new file name",async()=>{
        const img = "C:/Users/Black/Desktop/News/test/imgupdate.jpg"
        const data = fs.readFileSync(img)
        const files ={name:'imgupdate.jpg',data}
        const {imgName,imgPath} = savesFileImg(files)
        const NewImgName  ="updateThis"
        globalImgPath = imgPath
        const {imgName:newImageUpdate} =updateFileNews({name:NewImgName,data},imgPath)

        expect(imgName).toBe('imgupdate')
        expect(newImageUpdate).toBe(NewImgName)
        expect(newImageUpdate).not.toEqual('imgupdate')
    })
    
})