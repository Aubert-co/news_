
/*export const useFetchPosts = (category)=>{
    const [posts,setPosts] = useState([])

    useEffect(async()=>{
        const datas = await fetch(`http://localhost:8080/category/${category}`)
        const data = await datas.json()
        setPosts(data)
    },[])
    return posts
}*/
export const ApiInsert = async({body,})=>{
    const response = await fetch('http://localhost:8080/insert',
        {method:'POST',body}
    )
    return {status:response.status}
}
export const ApiFindCategory = async(category)=>{
    const datas = await fetch(`http://localhost:8080/category/${category}`)
    const data= await datas.json()
  
    return {data,status:datas.status}
}
export const ApiFindNews = async(id)=>{
    const response = await fetch(`http://localhost:8080/news/${id}`)
    const {datas} = await response.json()
    return {datas,status:response.status}
}

export const ApiSearch = async(category,search)=>{
    const datas = await fetch('http://localhost:8080/search',{
        method:'POST',
        body:JSON.stringify({category:category,search:search}),
        headers:{'Content-Type':'application/json'}
     })
    const data = await datas.json()
    return {data,status:datas.status}
}
