import { Container ,Main,Header} from "../styles/index.js"
import One_News from "../components/One_News.js"
import { NavIcons } from "../components/NavIcons.js"
import {useParams} from 'react-router-dom'
import { ApiFindNews } from "../service/index.js"
import { useState,useEffect } from "react"

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
          <One_News response={response}/>
      </div>
    </Container>
 )   
}
