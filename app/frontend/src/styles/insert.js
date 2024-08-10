import styled from "styled-components";
export const InsertStyle = styled.div`
.flex-form {
    
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    flex-direction: row;
  }
  
  /* Estilo para o formulário */
  .form {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 1%;
  }
  
  .forms  {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .form h1 {
    font-size: 18px;
    margin: 0;
    color: #333;
  }
  
  .form input[type="text"], .form input[type="file"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
    box-sizing: border-box;
  }
  
  .form input[type="file"] {
    padding: 5px;
  }
  .forms{
      
    
  }
  .form .main-form{
    
  }
  
  .preview {
    width: 70%;
    border-left: 1px solid #ccc;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 18px;
    text-align: center;

  }
  
  /* Efeito de foco nos inputs */
  .form input:focus {
    border-color: #007bff;
    outline: none;
  }
 
  `