 
export const newImgPath = (file)=>{
    
    file = file.current.files
    if(file.length ===0)return
    
    return  URL.createObjectURL(file[0])
}

export const removeItem = (datas,item)=>datas.filter((_, index) => item !== index)
.map((val,index)=>{
    return {...val,order:index+1}
})


export const generateFormData = (datas)=>{

    const formData = new FormData()
    Object.keys(datas).map((val)=>formData.append(val,datas[val]))

    return formData
}