import React,{ useEffect, useRef, useState } from "react";
export const ButtonSendDatas = ({setWarningDiv,InputValues})=>{
    const SendForm = async()=>{
        const formData = new FormData()
        const {resume,content,category,title,files} = InputValues
        const objs = {file:files.current.files[0],content:content.current.value,category,title:title.current.value,resume:resume.current.value,
        category:category.current.value}
    
        const ApendFormData = Object.keys(objs).map((val)=>formData.append(val,objs[val]))
        if(!objs.content)return setWarningDiv({msg:'conteudo deve ter pelo menos 10 caracteres',color:'red'})
        if(!objs.title)return setWarningDiv({msg:'titulo deve ter pelo menos 5 caracteres',color:'red'})
        if(!objs.resume)return setWarningDiv({msg:'resumo teve ter pelos menos 154 caracteres',color:'red'})
        if(!objs.file)return setWarningDiv({msg:'deve ter uma imagem',color:'red'})
        const datas = await fetch('http://localhost:8080/insert',{method:'POST',body:formData})
        if(datas.status !== 201)return setWarningDiv('Erro ao salvar os dados')
             
        setWarningDiv({msg:'Dados salvo com sucesso',color:'green'})
    } 
    return <button onClick={SendForm}>SEND</button>
}

export const DivShowWarning = ({msg,setWarningDiv,color})=>{
    useEffect(()=>{return()=>{setTimeout(()=>{setWarningDiv({msg:null})},5000)}},[msg])
    return msg ? <h1 style={{color}}>{msg}</h1>:''
}