import { generateFormData } from "./index";


const mockDatas = {
    title:"lorem isptu title",
    category:"categoryind lorem ipstu",
    resume:"resumem",
    name:""
}
const mockElements = [
    {
        title:"lorem isptu title1",
        category:"categoryind lorem ipstu1",
        resume:"resumem1",
        name:""
    },
    {
        title:"lorem isptu title2",
        category:"categoryind lorem ipstu2",
        resume:"resumem2",
        name:""
    }
]
describe("formdata",()=>{
    it("ttest",()=>{

        const returnedForm = generateFormData(mockDatas)
        
        
        expect(returnedForm.get("title")).toEqual(mockDatas.title)
        expect(returnedForm.get("category")).toEqual(mockDatas.category)
        expect(returnedForm.get("resume")).toEqual(mockDatas.resume)
        expect(returnedForm.has("name")).toBeFalsy()
        
    })
    it.only("etste2",()=>{
        const returnedForm = generateFormData(mockElements)
        
        returnedForm.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
    })
})