import React,{ useEffect, useRef, useState } from "react";
import {InsertStyle} from '../styles/insert'
import { ButtonSendDatas } from "../components/InserNews";
import {DivShowWarning} from '../components/ShowWarning'
import { List_items } from "../components/List_Elements";


const Elements = ({index,removeSubArticles,setSubArtDatas})=>{
    const ref = {subTitle:useRef(""),img:useRef(""),content:useRef("")}
    const order = index+1
    const addSubArticle= ()=>{
        const datas = [{subtitle:ref.subTitle,content:ref.content,file:ref.imgPath,order:key}]
        setSubArtDatas((prev)=>[...prev,datas])
    }
    return (
        
        <>
           <h1>Ordem {order}</h1>
            <div className="subtitle">
                <h1>Adicione um subtitulo</h1>
                <input type="text"></input>
            </div>
            <div className="subimg">
                <h1>Adicione uma imagem</h1>
                <input type="file"></input>
            </div>
            <div className="subcontent">
                <h1>Adicione um subcontent</h1>
                <input type="text"></input>
            </div>
            <button onClick={addSubArticle}>Adicionar subartigo {order}</button>
           {index !== 0 && <button onClick={()=>removeSubArticles(index)}>Remover subartigo {order}</button>}
        </>
    )
}

const InsertDatasForm =()=>{
    const [showWarningDiv,setWarningDiv] = useState({msg:'',color:''})
    const InputValues = {resume:useRef(""),content:useRef(""),title:useRef(""),category:useRef("games"),content:useRef(""),files:useRef("")}
    const [subArticles, setSubArticles] = useState([]);
    const [subArticlesDatas,setSubArtDatas] = useState([])
    const [preview,setPreview] = useState([])
    const addSubArticle = () => {
        setSubArticles([...subArticles, {}]);
      };

    const removeSubArticles = (i)=>{
        let newArticles =  subArticles.filter((val,index)=>{index!==i})
       
        setSubArticles([...newArticles,{}])
    }
    const change = ()=>{
        const value = (val)=>val.current.value
        const news = {resume:value(InputValues.resume),content:value(InputValues.content),title:value(InputValues.title)
            ,file:value(InputValues.files)}
        setPreview((prev)=>[...prev,{news}])
    }
    const datas = [
        {news:{creator:"lucas",title:"testanto",resume:"resume"}}
    ]
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
                <Elements index={index} key={index} setSubArtDatas={setSubArtDatas} removeSubArticles={removeSubArticles}/>
            ))}
            <button onClick={addSubArticle}>Adicionar mais subArtigos</button>

            <List_items datas={preview}/>
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

