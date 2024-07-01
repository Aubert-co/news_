import React,{ useEffect, useRef, useState } from "react";
import { ApiInsert } from "../service";
export const ButtonSendDatas = ({setWarningDiv,InputValues})=>{
    const SendForm = async()=>{
        const formData = new FormData()
        const {resume,content,category,title,files} = InputValues
        const objs = {file:files.current.files[0],content:content.current.value,category,title:title.current.value,resume:resume.current.value,
        category:category.current.value}
    
      
        if(!objs.content)return setWarningDiv({msg:'conteudo deve ter pelo menos 10 caracteres',color:'red'})
        if(!objs.title)return setWarningDiv({msg:'titulo deve ter pelo menos 5 caracteres',color:'red'})
        if(!objs.resume)return setWarningDiv({msg:'resumo teve ter pelos menos 154 caracteres',color:'red'})
        if(!objs.file)return setWarningDiv({msg:'deve ter uma imagem',color:'red'})
        Object.keys(objs).map((val)=>formData.append(val,objs[val]))
        
        const status = ApiInsert({body:formData})
        
        if(status !== 201)return setWarningDiv('Erro ao salvar os dados')
             
        setWarningDiv({msg:'Dados salvo com sucesso',color:'green'})
    } 
    return <button onClick={SendForm}>SEND</button>
}

