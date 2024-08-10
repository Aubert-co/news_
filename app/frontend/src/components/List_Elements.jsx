import React, { useEffect } from "react";


export const Preview_News = ({datas})=>{

    if(!datas)return
    
    return  datas.map((news)=>{
        return (
            <>
                {news?.creator && <h1 >Criador: {news.creator}</h1>}

                <div className="main-article">
                    <h1>{news?.content}</h1>
                    <h1>{news?.resume}</h1>
                    <h1> {news?.title}</h1>
                  {news?.imgPath &&  <img src={news.imgPath}/>}
                </div>
            </>
        )
    })
}

export const Preview_SubArticles = ({datas})=>{
        console.log("subArticles",datas)
        if(!datas)return
         
         return datas.map((elements)=>{ 
           
             return (   
             <div className="sub-articles">
                 {<h5 >order {elements?.order}</h5>}
                 {elements?.subtTitle && <h2>{elements.subTitle}</h2>}
                 {elements?.imgPath && <img src={elements.imgPath}/>}
                 {elements?.content && <p>{elements.content}</p>}
             </div>
         )})
     
}
export const Preview = ({datas})=>{
    
   return (
   <>
    {datas?.news && <Preview_News datas={datas.news}/>}
    {datas?.elements&& <Preview_SubArticles datas={datas.elements}/>}
   </>
   )
}