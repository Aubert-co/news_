import styled from "styled-components";
import { pcs, smartphones, tablets } from "./medias";



export const Header = styled.header`
grid-area: header;
position: fixed;
height: 100%;
width: 4%;
background-color:red;
a{
    color: white;
    margin-left:5%;
    margin-top: 3%;
    text-decoration: none;
    text-align: center;
}
header:hover{
    width: 10%;
    transition-delay: 0.1s;
}

.icon{
    text-align: center;
}
nav{
    background-color: #1e1e1e;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    font-size:24px
}

nav .itens{
    display: flex;
    margin: 10%;
    color: white;
    font-size:24px;
}
.itens:hover{
    background-color: #a5a2a2;
    cursor: pointer;
}
.active{
    background-color:#a5a2a2
}
i{
    justify-content: center;
    text-align: center;
    cursor: pointer;
    margin-right: 10%;
    color: white;
}

`
export const TopNavStyle = styled.div`
.top_nav input,button{
    padding: 5px;
    border: 3px solid #c5c2c2;
    background-color: #141313;
    border-radius:5px;
    color: white;
    text-align: center;
    outline: none;
}
.top_nav button i{
    cursor: pointer;
    margin-left: 1%;
}

`
export const Main = styled.main`
grid-area: main;
margin: 2%;
display: flex;
flex-direction: column;
flex-wrap: wrap;
background-color: #1e1e1e;

.box_news{
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

.content_news{
    display: flex;
    flex-direction: row;
    height: 200px;
    width: 40%;
    margin: 2%;
    border: 1px solid #1e1e1e;
    background-color: #1e1e1e;
    border-radius:15px;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.content_news .text a{
    text-align: center;
    color: aliceblue;
    text-decoration: none;
    font-weight: 900;
    text-indent: 1px;
    line-height: 20px;
}
.content_news .img{
    width: 70%;
    height: 70%;
    background-color: rgb(83, 77, 77);
    margin-left: 2%;
} 
img{
    width:100%;
    height:100%;
}
.content_news .text{
    margin-right: 2%;
}

.text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 4%;
}

`
export const PageNews = styled.div`
display:flex;
grid-area:main;
background-color: #1e1e1e;
height:92.7vh;
flex-direction: column;
text-align: center;
color:white;
font-family: 'Courier New', Courier, monospace;
justify-content:center;
margin:2%;
img{
    height:350px;
    margin:2%
}
.text_content{
    display:flex;
    justify-content:center;
}
p{
    width:50%;
}
`
export const Container = styled.div`
.container{
display: grid;
grid-template:      "header main main " 
                    "header main main  " ;
grid-template-columns: 10% 80% ;
column-gap: 1%;
background-color: black;
height: 100%;
}
.top_nav svg{
    color:white;
    cursor:pointer;
    font-size:36px;
}
header{
    grid-area: header;
    height: 100%;
    width:10%;
}
.box_news{
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
}
.content_news{
    display: flex;
    flex-direction: column;
    height: 275px;
    width: 250px;
  
    border: 1px solid #312b2b;
    background-color: #141313;
    border-radius:15px;
}
.content_news .img{
    margin-top: 2%;
    width: 80%;
    height: 80%;
    background-color:rgb(211, 208, 208);
}  
.content_news .text{
    width: 80%;
    height: 80%;
}
${pcs}
${tablets}
${smartphones}
` 