import React, { useEffect } from "react";
import { Article,SubArticles } from "./ListArticle";


export const Preview = ({datas})=>{
    
   return (
   <>
    {datas?.news && <Article datas={datas.news}/>}
    {datas?.elements&& <SubArticles datas={datas.elements}/>}
   </>
   )
}