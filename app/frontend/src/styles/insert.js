import styled from "styled-components";
export const InsertStyle = styled.div`
.flex{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: white;
    justify-content: center;
    text-align: center;
    color: black;
}
.inputs{
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: center;
}
.itens{
    margin: 1%;
}
textarea,input{
    text-align:center;
    outline:none
}
button{
    width: 8%;
    cursor: pointer;
    height: 40px;
}
button:hover{
    background-color: #FBED29;
}
`