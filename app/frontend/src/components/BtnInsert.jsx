import React,{ useEffect, useRef, useState } from "react";
import { ApiInsert } from "../service";
import { generateFormData } from "../utils";


export const BtnInsert = ({setWarningDiv,InputValues})=>{
    

    
    const SendForm = async()=>{
        const {article,elements} = InputValues
      
        /*
          //  if(!InputValues.article )return setWarningDiv({msg:'O artigo não pode estar vazio!'})
        if(!title)return setWarningDiv({msg:'titulo deve ter pelo menos 5 caracteres',color:'red'})
        if(!resume)return setWarningDiv({msg:'resumo teve ter pelos menos 154 caracteres',color:'red'})
        if(!imgPath)return setWarningDiv({msg:'deve ter uma imagem',color:'red'})
        */
       // const formData = generateFormData(  article )
        const status =await ApiInsert(article)
        
        if(status !== 201)return setWarningDiv('Erro ao salvar os dados')
             
        setWarningDiv({msg:'Dados salvo com sucesso',color:'green'})
    } 
    return <button data-testid="insertDatas" onClick={SendForm}>SEND</button>
}

