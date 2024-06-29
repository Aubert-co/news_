import React, { useEffect, useState } from "react";
import { generatePath } from "react-router";
import { Link ,useParams } from "react-router-dom";
import { PageNews } from "../styles/index.js"


const link = (id) => generatePath("/news/pages/:id", {id,entity: "posts"});

export const List = ({typeNews,datas})=>{
  //category,title,imgPath,resume,id,imgName}
    const map = (val)=>{
        const img = val.imgPath.replace('./public','')
        const srcLink = `http://localhost:8080/static${img}`
        const linkToChangePage = link(val.id)
        //const key = `${val.id}${category}`

            return (typeNews === "Home" ?  
                (
                  <div key={val.id} data-testid="list_home" className="content_news">
                    <div data-testid="home_img" className="img">
                      <Link to={linkToChangePage}>  
                        <img alt={val.imgName} src={srcLink}/> 
                      </Link>
                    </div>
                    <div data-testid="home_content" className="text" >
                      <Link className="link contentLink" to={linkToChangePage}>{val.resume}</Link>
                    </div>
                  </div>
                ) : (
                  <div data-testid="itens_news" className="itens_news" key={val.id}>
                    <div data-testid="title_news" className="title">
                      <h1>{val.title}</h1>
                    </div>
                    <div data-testid="img_news" className="img">
                      <img src={srcLink} alt={val.title} />
                    </div>
                    <div data-testid="content_news" className="text_content">
                      <p>{val.content}</p>
                    </div>
                  </div>
                )
              )
              
         
    }
    return datas.map(map)
}
export  const List_itens=({data})=>{
    if(!data)return ''
    return (
          <div className="box_news" >
             <List typeNews={"Home"} datas={data}/>
          </div>
    )
}
export default function One_News({response}){
  if(!response.datas)return ''
  return (
       <PageNews>
              <List typeNews={"One_News"} datas={response.datas} />
       </PageNews>
      )
}