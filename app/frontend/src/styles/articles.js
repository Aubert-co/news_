import styled from "styled-components";


const Articles = styled.div`
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .img{
    width: auto;
    height: auto;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  img{
    width: 100%;
    height: auto;
  }
  .text,.title  {
    font-family: "Arial", sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
    text-align: center;
    text-transform: uppercase;
    line-height: 1.5;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px #000000;
    width: 70%;
    text-align: justify;
    font-weight: 300;
  }
  
  .title{
   
    margin-top: 2%;
    text-align: left;
  
  }
  @media screen and (max-width: 768px) {
   header{
    grid-area: header;
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0px;
   }
   .logo{
    font-size: 12px;
   }
   .text{
    width: 100%;
   }
   .title{
    text-align: left;
    width: 100%;
   }
  
   .img{
    width: 100%;
    height: 100%;
   }
  }
`