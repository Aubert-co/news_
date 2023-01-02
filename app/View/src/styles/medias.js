export const pcs = `
@media (min-width:1140px) and (max-width: 4500px) {
    .top_nav{
        display: flex;
        width: 100%;
        text-align: center;
    }
    .top_nav input{
        width: 100%;
        padding: 2%;
    }
    .search_news{
        display: flex;
       
        text-align: center;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
        justify-items: center;
        width: 50%;
    }
    .inputs_text{
        width: 80%;
    }
    .search_news .material{
        margin-top: 1%;
        font-size: 36px;
    }
   .search_news i{
    font-size: 36px;
    }
    .show_nav{
        display: flex;
        opacity: 0;
        width: 30%;
        justify-content: start;
    }
}
`

export const tablets = `

@media(min-width:500px)and (max-width:1140px){
    .container{
        display: grid;
        grid-template:  "main main main " ;
        column-gap: 1%;
        width: 100%;
    }
    header{
        height: 100%;
        width: 75%;
        display: none;
    }
    nav{
        background-color: #1e1e1e;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    
    nav .itens{
        display: flex;
        margin: 30%;
        color: rgb(209, 202, 202);
    }
    main{
        grid-area: main;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: #1e1e1e;
        width: 92%;
    }
    .content_news .text{
        width: min-content;
        height: min-content;
    }
    .top_nav{
        display: flex;
        width: 100%;
        align-self: center;
        justify-content: start;
        margin: 2%;
    }
    .show_nav{
        opacity: 1;
    }
 
    .top_nav input{
        width: 100%;
    }
    .box_news{
        display: flex;
        height: 100%;
        flex-wrap: wrap;
      
        width: 96%;
    }
    .content_news{
        display: flex;
        flex-direction: column;
        height: 250px;
        width: 200px;
        
        border: 1px solid #1e1e1e;
        background-color: #4e3434;
        border-radius:15px;
        text-align: center;
    }
    .content_news .img{
        margin-top: 2%;
        width: 80%;
        height: 80%;
        background-color:rgb(238, 231, 235);
    }  
    .content_news .text{
        width: 80%;
        height: 80%;   
    }
    .content_news .text a{
        font-family: "Times New Roman", Times, serif;
        text-align: justify;
    }
}
`

export const smartphones = `
@media  (max-width: 500px){
   
    .container{
        display: flex;
        width: 100%;
        height: 100%;
    }
    .news{
        width:100%;
    }
    header{
        height: 100%;
        width: 75%;
        display: none;
    }
    nav{
        background-color: #1e1e1e;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    
    nav .itens{
        display: flex;
        margin: 30%;
        color: rgb(209, 202, 202);
    }
    main{
        grid-area: main;
      
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: #1e1e1e;
        width: 100%;
        height: 100%;
    }
    .content_news .text{
        width: min-content;
        height: min-content;
    }
    .top_nav{
        display: flex;
        width: 100%;
        align-self: center;
        justify-content: start;
    }
    .show_nav{
        opacity: 1;
    }
 
    .top_nav input{
        width: 100%;
        display: none;
    }
    .box_news{
        display: flex;
        height: 20%;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }
    .content_news{
        display: flex;
        flex-direction: column;
        height: 10%;
        width: 80%;
        
        border: 1px solid #1e1e1e;
        background-color: #4e3434;
        border-radius:15px;
        text-align: center;
    }
    .content_news .img{
        margin-top: 5%;
        width: 80%;
        height: 200px;
        background-color:rgb(238, 231, 235);
    }  
    .content_news .text{
        width: 80%;
        height: 80%;   
    }
    .content_news .text a{
        font-family: "Times New Roman", Times, serif;
        text-align: justify;
        font-size: x-large;
    }
   
}`