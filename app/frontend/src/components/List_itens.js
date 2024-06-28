import React, { useEffect, useState } from "react";
import { generatePath } from "react-router";
import { Link ,useParams } from "react-router-dom";

const link = (id) => generatePath("/news/pages/:id", {id,entity: "posts"});

const map = ({category,title,imgPath,resume,id,imgName})=>{
    const img = imgPath.replace('./public','')
    const srcLink = `http://localhost:8080/static${img}`
    const linkToChangePage = link(id)
    const key = `${id}${category}`

        return (
                <div key={id} data-test="list-item" className="content_news">
                    <div data-test="div_img" className="img">
                        <Link to={linkToChangePage}>  <img alt={imgName} src={srcLink}/> </Link>
                    </div>
    
                    <div className="text" key={key}>
                        <Link className="link contentLink" to={linkToChangePage}>{resume}</Link>
                    </div>
                </div>
        )
}

export  const List_itens=({data})=>{
    const mapDatas = data.map(map)
    return (
            <div className="box_news" >
                {mapDatas}
            </div>
    )
}