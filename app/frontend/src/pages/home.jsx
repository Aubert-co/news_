import React ,{ useEffect, useState } from 'react'
import Box_itens from '../components/Box_itens.jsx'
import {NavIcons} from '../components/NavIcons.jsx'
import {TopNav} from '../components/TopNav.jsx'
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
