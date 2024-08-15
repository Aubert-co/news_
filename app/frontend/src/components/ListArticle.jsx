/*import React from "react";
import { generatePath } from "react-router";
import { Link  } from "react-router-dom";



const link = (id) => generatePath("/news/pages/:id", {id,entity: "posts"});

 const List = ({typeNews,datas})=>{
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
    if(!data)return <h1 data-testid="error_home">Algo deu errado!</h1>
    return <List typeNews={"Home"} datas={data}/>
   
    
}
export function One_News({datas}){
  if(!datas)return <h1 data-testid="error_one">Algo deu errado!</h1>
  return <List typeNews={"One_News"} datas={datas} />
}*/
import React from "react"
export const Article = ({ datas }) => {
  if (!datas) return;

  return datas.map((news, ind) => {
    return (
      <div key={ind} id={`article-${ind}`} className="main-article">
        {news?.creator && <h1>Criador: {news.creator}</h1>}
        <h1 data-testid="preview_title">{news?.title}</h1>
        <h1 data-testid="preview_content">{news?.content}</h1>
        <h1 data-testid="preview_resume">{news?.resume}</h1>
        {news?.imgPath && <img data-testid="preview_img" src={news.imgPath} />}
      </div>
    );
  });
};

export const SubArticles = ({datas})=>{
       
  if(!datas)return
   
   return datas.map((elements)=>{ 
     
       return (   
       <div key={elements.order} className="sub-articles">
           {elements?.subtTitle && <h2  data-testid="preview_subTitle">{elements.subTitle}</h2>}
           {elements?.imgPath && <img  data-testid="preview_subImg" src={elements.imgPath}/>}
           {elements?.content && <p  data-testid="preview_subContent">{elements.content}</p>}
       </div>
   )})

}