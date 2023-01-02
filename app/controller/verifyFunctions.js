module.exports =  {
    
    verifyCategorIsAcceptable : (category)=>{
        const categoryAccepted = ['games','animals','sports','all']
        const verifyCategory = categoryAccepted.indexOf(category) 
        if(verifyCategory === -1)return false
        return true
    },
    verifyIdIsAceeptable :(id)=>{
        if(isNaN(id) || id=== null || id=== undefined)return false
        return true
    },
    verifyResumeAndTitleIsAceeptable : (resume,title)=>{
        if(resume === undefined || resume ===  null || resume === '')return false
        if(title === null || title === undefined || title === '')return false
        if(resume.length > 155 && title.length >20)return false
        if(resume.length < 30 && title.length < 5)return false
       
        return true
    }
}
