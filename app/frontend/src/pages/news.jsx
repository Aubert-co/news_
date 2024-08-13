import { Container ,Main,Header} from "../styles/index.js"
//import {One_News} from "../components/List_News.jsx"
import { NavIcons } from "../components/NavIcons.jsx"
import {useParams} from 'react-router-dom'
import { ApiFindNews } from "../service/index.js"
import React,{ useEffect, useState } from "react";
import { PageNews } from "../styles/index.js"
const receceiveDatas = async (setResponse,id)=>{
  const {datas,status} = await ApiFindNews(id)
  setResponse({datas,status})
  
}
export  const News = ()=>{
  const {id} = useParams()
  const [response,setResponse] = useState({datas:'',status:null})
  const [updateScreen,setUpdateScreen] = useState(true)
  
  useEffect(()=>{
    receceiveDatas(setResponse,id)
    return ()=>{
        setUpdateScreen(false)
    }
},[updateScreen])
 return(
    <Container>
      <div className="container">
          <Header>
            <NavIcons/>
         </Header>
         <PageNews>
         
         </PageNews>
        
      </div>
    </Container>
 )   
}

//<One_News datas={response.datas}/>