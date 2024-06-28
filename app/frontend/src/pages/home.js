import React ,{ useEffect, useState } from 'react'
import Box_itens from '../components/Box_itens.js'
import {NavIcons} from '../components/NavIcons'
import {TopNav} from '../components/TopNav'
import { Container ,Header ,Main, TopNavStyle} from "../styles/index.js"


export const Home=()=>{
   const [searchValues,setSearchValues] = useState({search:''})
 
 return(

    <Container>
     <div className="container">
         <Header>
            <NavIcons/>
         </Header>
         
         <Main>
         <TopNavStyle>
            <TopNav setSearchValues={setSearchValues}/>
         </TopNavStyle>
         
            <Box_itens  searchValues = {searchValues}/>
         </Main>
      </div>
    </Container>

 )   
}
