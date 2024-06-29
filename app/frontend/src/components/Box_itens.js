import React, { useEffect, useState } from "react";
import { ApiFindCategory, ApiSearch } from "../service/index.js";
import { Link ,useParams } from "react-router-dom";
import { List_itens } from "./List_News.js";


const receceiveDatas = async (setDatas,category,search)=>{
    if(search){
        const {data,status} = await ApiSearch(category,search)
        return setDatas(data,status)
    }
    const {data,status} = await ApiFindCategory(category)    
    setDatas(data,status)
}

export default function Box_itens({searchValues}){
    const [getDatas,setDatas] = useState({data:[],status:''})
    const {value} = useParams()

    useEffect(()=>{
        const urlData = value === undefined ? 'all':value
        receceiveDatas(setDatas,urlData,searchValues.search)
    },[value,searchValues.search]) 
    
    return (
        <div className="news">
            <List_itens data={getDatas.data}/>
        </div>
    )
}