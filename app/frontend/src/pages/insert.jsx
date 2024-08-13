import React,{ useEffect, useRef, useState } from "react";
import {InsertStyle} from '../styles/insert'
import { ButtonSendDatas } from "../components/InserNews";
import {DivShowWarning} from '../components/ShowWarning'
import { Preview } from "../components/PreviewArticle";
import { newImgPath,removeItem } from "../utils";



const getCurrentValue = (val)=>val.current.value
const Elements = ({order,setSubArticles,setSubArtDatas})=>{
    const ref = {subTitle:useRef(""),imgPath:useRef(""),content:useRef("")}
    

    const removeSubArticles = (item)=>{
        item = item-1
        setSubArticles((datas)=>removeItem(datas,item));
        setSubArtDatas((datas)=>removeItem(datas,item))
        
    }  

    useEffect(()=>{
        const elements = [{subTitle:getCurrentValue(ref.subTitle),content:getCurrentValue(ref.content),files:ref.imgPath,order}]
        
        setSubArtDatas((prev)=>[...prev,...elements]);
    },[])
        
    
    const change = ()=>{
        
        const filter = (datas)=>datas.map((val) => {
           if(val.order === order){

            return {   subTitle:getCurrentValue(ref.subTitle),content:getCurrentValue(ref.content),imgPath:newImgPath(ref.imgPath),order:val.order}
           }
           return val
        });
        
          setSubArtDatas((datas)=>filter(datas));
          
    }
    const removerImg = ()=>{
      
        const filter = (datas)=>datas.map((val) => {
    
           if(val.order === order){
           
             ref.imgPath.current.value = ""
            return { ...val,imgPath: ''}
           
           }
           return val
        });
        setSubArtDatas(filter)
        
    }
    return (
        
        <div key={order}>
           <h1 >Ordem {order}</h1>
            <div className="subtitle">
                <h1>Adicione um subtitulo</h1>
                <input onChange={change} ref={ref.subTitle} type="text"></input>
            </div>
            <div className="subimg">
                <h1>Adicione uma imagem</h1>
                <input onChange={change} ref={ref.imgPath} type="file"></input>
            </div>
            <div className="options">
                    {ref.imgPath.current && <button onClick={removerImg}>remover imagem</button> }
            </div>
            <div className="subcontent">
                <h1>Adicione um subcontent</h1>
                <input onChange={change} type="text" ref={ref.content}></input>
            </div>
         
        <button onClick={()=>removeSubArticles(order)}>Remover subartigo {order}</button>
        </div>
    )
}

export const CreateArticlesForm =()=>{
    const [showWarningDiv,setWarningDiv] = useState({msg:'',color:''})
    const InputValues = {resume:useRef(""),content:useRef(""),title:useRef(""),
        category:useRef("games"),content:useRef(""),imgPath:useRef("")}
    const [subArticles, setSubArticles] = useState([]);
    const [subArticlesDatas,setSubArtDatas] = useState([])
    const [previewNews,setPreviewNews] = useState([])
    const addSubArticle = () => {
        setSubArticles([...subArticles, {}]);
       
      };


  
    const change = ()=>{
    
        const news = {resume:getCurrentValue(InputValues.resume),content:getCurrentValue(InputValues.content),title:getCurrentValue(InputValues.title)
            ,imgPath:newImgPath(InputValues.imgPath)}
            setPreviewNews(news);
    }
    
    return (
        <div className="flex-form">
          <DivShowWarning showWarningDiv={showWarningDiv} setWarning={setWarningDiv}/> 
        <div className="form">
          
           <div className="main-form">
            <div className="forms">
                    <h1>Adicionar Artigo Principal</h1>
                    <textarea data-testid="content" onChange={change}  className="contentText" ref={InputValues.content} rows="7" cols="40" placeholder="CONTENT"></textarea>
                </div>

                <div className="forms">
                    <h1>Adicionar titulo</h1>
                    <input data-testid="title" onChange={change} type="text" className="filesOne" placeholder="Title" ref={InputValues.title}/>
                </div>
                
                <div className="forms">
                    <h1>Adicionar resumo</h1>
                    <textarea data-testid="resume" onChange={change} className="resumeText" key="resume" maxLength={150}  ref={InputValues.resume} rows="4" cols="20" placeholder="RESUME"></textarea>
                </div>
                
                <div className="forms">
                    <h1>Adicionar Image</h1>    
                    <input data-testid="img" onChange={change} type="file" className="files" ref={InputValues.imgPath}/>
                </div>
           </div>
           <div className="form-elements">
            {subArticles.map((_, index) => (
                    <Elements  order={index+1} key={index} setSubArticles={setSubArticles} setSubArtDatas={setSubArtDatas} />
                ))}
           </div>
            <button onClick={addSubArticle}>Adicionar mais subArtigos</button>


            <ButtonSendDatas setWarningDiv={setWarningDiv} InputValues={InputValues} />
        </div>
        <div className="preview">
               
                <Preview datas={{news:[previewNews],elements:subArticlesDatas}}/>
        </div>
    </div>
    )
}

export const Insert = ()=>{
    return (
        <InsertStyle>
                <CreateArticlesForm/>
        </InsertStyle>
    )
}

