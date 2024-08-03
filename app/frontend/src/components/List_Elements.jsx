import React, { useEffect } from "react";


export const List_items = ({datas,type})=>{
    
    if(!datas)return
    
    console.log("datas",datas)
    const src = (imgPath)=>type ==="preview" ? imgPath[0].files: "localhost:8080"+imgPath

    const MapElements = ({values})=>{
       if(!values)return
        return values.map((elements)=>{ 
        return (   
            <div className="sub-articles">
                {type === "preview" && <h5 >order {elements.order}</h5>}
                {elements.subtitle && <h2>{elements.subtitle}</h2>}
                {elements.imgPath && <img src={src(elements.imgPath)}/>}
                {elements.content && <p>{elements.content}</p>}
            </div>
        )})
    }
    
    return  datas.map(({news,elements})=>{
     
        return (
            <>
                {news?.creator && <h1 >Criador: {news.creator}</h1>}

                <div className="main-article">
                    <h1>{news?.content}</h1>
                    <h1>{news?.resume}</h1>
                    <h1> {news?.title}</h1>
                  {news?.files &&  <img src={src(news.files)}/>}
                </div>

                <MapElements values={elements}/>
            </>
        )
    })
}

