import React from "react"
import { PageNews } from "../styles/index.js"



const map = ({id,title,content,imgPath})=>{
    const img = imgPath.replace('./public','')
    const src = `http://localhost:8080/static${img}`
        return (
            <div className="itens_news" key={id}>
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="img">
                    <img src={src}/>
                </div>
    
                <div className="text_content">
                    <p>{content}</p>
                </div>
            </div>
        )
}

export default function One_News({response}){
    const renders = response.datas  ? map(response.datas) : ''
    return (
         <PageNews>
                {renders}
         </PageNews>
        )
}