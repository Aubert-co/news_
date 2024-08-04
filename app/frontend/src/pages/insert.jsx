import React,{ useEffect, useRef, useState } from "react";
import {InsertStyle} from '../styles/insert'
import { ButtonSendDatas } from "../components/InserNews";
import {DivShowWarning} from '../components/ShowWarning'
import { List_items } from "../components/List_Elements";

const value = (val)=>val.current.value
const Elements = ({index,removeSubArticles,setSubArtDatas,setPreview})=>{
    const ref = {subTitle:useRef(""),file:useRef(""),content:useRef("")}
    const order = index+1
    const addSubArticle= ()=>{
        const elements = [{subtitle:value(ref.subTitle),content:value(ref.content),files:ref.imgPath,order}]
        setSubArtDatas((prev)=>[...prev,elements])
       
    }
    const change = ()=>{
        const elements = [{subtitle:value(ref.subTitle),content:value(ref.content),files:ref.file,order}]
       
        setPreview({elements})
    }
    return (
        
        <>
           <h1>Ordem {order}</h1>
            <div className="subtitle">
                <h1>Adicione um subtitulo</h1>
                <input onChange={change} ref={ref.subTitle} type="text"></input>
            </div>
            <div className="subimg">
                <h1>Adicione uma imagem</h1>
                <input onChange={change} ref={ref.file} type="file"></input>
            </div>
            <div className="subcontent">
                <h1>Adicione um subcontent</h1>
                <input onChange={change} type="text" ref={ref.content}></input>
            </div>
            <button onClick={addSubArticle}>Adicionar subartigo {order}</button>
        <button onClick={()=>removeSubArticles(index)}>Remover subartigo {order}</button>
        </>
    )
}

const InsertDatasForm =()=>{
    const [showWarningDiv,setWarningDiv] = useState({msg:'',color:''})
    const InputValues = {resume:useRef(""),content:useRef(""),title:useRef(""),category:useRef("games"),content:useRef(""),files:useRef("")}
    const [subArticles, setSubArticles] = useState([]);
    const [subArticlesDatas,setSubArtDatas] = useState([])
    const [preview,setPreview] = useState({news:'',elements:''})
    const addSubArticle = () => {
        setSubArticles([...subArticles, {}]);
      };

    const removeSubArticles = (i)=>{
        let newArticles =  subArticles.filter((val,index)=>{index!==i})
        setPreview({elements:''})
        if(i  === 0)return setSubArticles([],{})
        setSubArticles([...newArticles,{}])
    }
    const change = ()=>{
    
        const news = {resume:value(InputValues.resume),content:value(InputValues.content),title:value(InputValues.title)
            ,files:InputValues.files}
        setPreview({news})
    }
    return (
        <div className="flex">
          <DivShowWarning showWarningDiv={showWarningDiv} setWarning={setWarningDiv}/> 
        <div className="inputs">
          
            <div className="itens">
                <h1>Adicionar Artigo Principal</h1>
                <textarea onChange={change}  className="contentText" ref={InputValues.content} rows="7" cols="40" placeholder="CONTENT"></textarea>
            </div>

            <div className="itens">
                <h1>Adicionar titulo</h1>
                <input onChange={change} type="text" className="filesOne" placeholder="Title" ref={InputValues.title}/>
            </div>
            
            <div className="itens">
                <h1>Adicionar resumo</h1>
                <textarea onChange={change} className="resumeText" key="resume" maxLength={150}  ref={InputValues.resume} rows="4" cols="20" placeholder="RESUME"></textarea>
            </div>
            
            <div className="itens">
                <h1>Adicionar Image</h1>    
                <input onChange={change} type="file" className="files" ref={InputValues.files}/>
            </div>
            {subArticles.map((_, index) => (
                <Elements setPreview={setPreview} index={index} key={index} setSubArtDatas={setSubArtDatas} removeSubArticles={removeSubArticles}/>
            ))}
            <button onClick={addSubArticle}>Adicionar mais subArtigos</button>

            <List_items datas={[preview]}/>
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

