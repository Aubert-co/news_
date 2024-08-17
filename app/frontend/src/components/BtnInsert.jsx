import React,{ useEffect, useRef, useState } from "react";
import { ApiInsert } from "../service";
import { generateFormData } from "../utils";


export const BtnInsert = ({setWarningDiv,InputValues})=>{
    const elements = InputValues.elements
    const news = InputValues.news
    const SendForm = async()=>{
        const {resume,content,category,title,imgPath} = InputValues

        if(!title)return setWarningDiv({msg:'titulo deve ter pelo menos 5 caracteres',color:'red'})
        if(!resume)return setWarningDiv({msg:'resumo teve ter pelos menos 154 caracteres',color:'red'})
        if(!imgPath)return setWarningDiv({msg:'deve ter uma imagem',color:'red'})
       
        const formData = generateFormData(datas)
        const status = ApiInsert({body:formData})
        
        if(status !== 201)return setWarningDiv('Erro ao salvar os dados')
             
        setWarningDiv({msg:'Dados salvo com sucesso',color:'green'})
    } 
    return <button onClick={SendForm}>SEND</button>
}

