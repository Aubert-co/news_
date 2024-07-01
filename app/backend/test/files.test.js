const { savesImg,existImg,createPathImg} = require('../helpers/saveFiles')

const fs = require('fs').promises
const path =require('path')
var globalImgPath  
const pathImg = path.join(__dirname, 'imgupdate.jpg');


describe("tests cases files",()=>{
    beforeEach(()=>{
    
        jest.clearAllMocks()
    })
    afterEach(async()=>{
        const existeFile = await existImg(globalImgPath)
        if(existeFile)await fs.unlink(globalImgPath)
    })
    afterAll(async()=>{
        try{
            const existeFile = await existImg(globalImgPath)
            if(existeFile)await fs.unlink(globalImgPath)
          
        }catch(err){
            throw err
        }
    })
    it("When not sending an 'imgPath' to saveImg, it should not create an image.",async()=>{
        const mockFS  = jest.spyOn(fs,'writeFile')
        const data = await fs.readFile(pathImg)
        const files ={name:'imgupdate.jpg',data}
        const {imgName,imgPath,extension} = createPathImg(files)
        await  savesImg(files)
        const exists= await existImg(imgPath)
        expect(exists).toBeFalsy()
        expect(imgName).toEqual('imgupdate')
        expect(extension).toEqual('jpg')
        
        expect(mockFS).toHaveBeenCalledTimes(0)
      
    })
    it("Should return success when sending a file with both a name and data",async()=>{
        const mockFS  = jest.spyOn(fs,'writeFile')
        const data = await fs.readFile(pathImg)
        const files ={name:'imgupdate.jpg',data}
        const {imgName,imgPath,extension} = createPathImg(files)
        await  savesImg(files,imgPath)

        const exists= await existImg(imgPath)
        expect(exists).toBeTruthy()
        expect(imgName).toEqual('imgupdate')
        expect(extension).toEqual('jpg')
        expect(mockFS).toHaveBeenCalledTimes(1)
      
        const firstArgument = mockFS.mock.calls[0][0];
        const secondArgument = mockFS.mock.calls[0][1]
        expect(firstArgument).toBe(imgPath);    
        expect(secondArgument.toString()).toBe(Buffer.from(data).toString())
    
        globalImgPath = imgPath
    })
    it("Should return undefined when sending a file without both a name and data.",async()=>{
        const files ={}
        const {imgName,imgPath,extension} =  createPathImg(files)

        expect(imgName).toBeUndefined()
        expect(imgPath).toBeUndefined()
        expect(extension).toBeUndefined()
       
    })
    it("Should return undefined when sending a file without a name.",async()=>{
        
        const data = await fs.readFile(pathImg)
        const files ={data}
        const {imgName,imgPath} =  createPathImg(files)

     
        expect(imgName).toBeUndefined()
      
        expect(imgPath).toBeUndefined()
       
    })
    it("Should return undefined when sending a file without data.",async()=>{
        
     
        const files ={name:pathImg}
        const {imgName,imgPath} =  createPathImg(files)

        expect(imgName).toBeUndefined()
        expect(imgPath).toBeUndefined()
       
    })
  
   
})

