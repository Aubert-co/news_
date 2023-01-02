import React,{useState} from "react";
import { Route, BrowserRouter ,Switch} from "react-router-dom";
import {Home} from './home.js'
import {Insert} from './insert.js'
import {News} from './news.js'




const Routes = () => {
  
    return(
       <BrowserRouter>
         
            <Switch>
                    <Route component = { Home }  path="/" exact />
                    <Route component = { Home }  path="/news/category/:value"  />
                    <Route component = { Home }  path="/news/category/:value" />
                    <Route component = { Home }  path="/news/category/:value"/>
                    <Route component = { News }  path="/news/pages/:id" />
                    <Route component={Insert} path="/insert"/>
            </Switch>
        
       </BrowserRouter>
   )
}
/**
 *    <Route component = { Sobre }  path="/news/category/:value" /> */     
              
export default Routes;