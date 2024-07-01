import React,{useState} from "react";
import { Route, BrowserRouter as Router ,Routes  } from "react-router-dom";

import {Home} from './home'
import {Insert} from './insert'
import {News} from './news'


export const App = () => {
   
    return(
       <Router>
            <Routes>
                    <Route element = { <Home/> }  path="/" exact />
                    <Route element = { <Home/> }  path="/news/category/:value"  />
                    <Route element = { <Home/> }  path="/news/category/:value" />
                    <Route element = { <Home/> }  path="/news/category/:value"/>
                    <Route element = { <News/> }  path="/news/pages/:id" />
                    <Route element={<Insert/>} path="/insert"/>
            </Routes>
        
       </Router>
   )
}
/**
 *    <Route element = { Sobre }  path="/news/category/:value" /> */     
              
