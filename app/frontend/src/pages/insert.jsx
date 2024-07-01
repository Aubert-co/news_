import React,{ useEffect, useRef, useState } from "react";
import {InsertStyle} from '../styles/insert'
import { ButtonSendDatas } from "../components/InserNews";
import {DivShowWarning} from '../components/ShowWarning'

const InsertDatasForm =()=>{
    const [showWarningDiv,setWarningDiv] = useState({msg:'',color:''})
    const InputValues = {resume:useRef(""),content:useRef(""),title:useRef(""),category:useRef("games"),content:useRef(""),files:useRef("")}

    return (
        <div className="flex">
          <DivShowWarning showWarningDiv={showWarningDiv} setWarning={setWarningDiv}/> 
        <div className="inputs">
          
            <div className="itens">
                <h1>Adicionar conteúdo</h1>
                <textarea  className="contentText" ref={InputValues.content} rows="7" cols="40" placeholder="CONTENT"></textarea>
            </div>

            <div className="itens">
                <h1>Adicionar titulo</h1>
                <input type="text" className="filesOne" placeholder="Title" ref={InputValues.title}/>
            </div>
            
            <div className="itens">
                <h1>Adicionar resumo</h1>
                <textarea className="resumeText" key="resume" maxLength={150}  ref={InputValues.resume} rows="4" cols="20" placeholder="RESUME"></textarea>
            </div>
            <div className="itens">
                <h1>Adicionar categoria</h1>
                <select name="" className="filesOne" ref={InputValues.category}>
                    <option value="games">Games</option>
                    <option value="animals">Animais</option>
                    <option value="sports">Sports</option>
                </select>
            </div>
            <div className="itens">
                <h1>Adicionar Image</h1>    
                <input type="file" className="files" ref={InputValues.files}/>
            </div>
            <ButtonSendDatas setWarningDiv={setWarningDiv} InputValues={InputValues} />
        </div>
    </div>
    )
}

export const Insert = ()=>{
    return (
        <InsertStyle>
                <InsertDatasForm/>
        </InsertStyle>
    )
}

