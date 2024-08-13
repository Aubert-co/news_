import React from 'react';
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { Insert } from '../pages/insert';
import '@testing-library/jest-dom'

const mockDataHome = 
  {
   resumo:"lorem iptsu resumo",
   content:"lorem iptsu content",
   title:"lorem ipstu title"
  }
;



describe('List Component', () => {
    beforeAll(()=>{
      
    })
    it.only('should render Home type news correctly', () => {
        render(
            <Insert/>
        );
        const content = screen.queryByTestId("content")
        const previewContent  = screen.getByTestId("preview_content")
        const title = screen.getByTestId("title")
        const previewTitlte= screen.queryByTestId("preview_title")
        const resume = screen.queryByTestId("resume")
        const previewRusume = screen.queryByTestId("preview_resume")

        fireEvent.input(content, { target: { value: 'testando' } });
        fireEvent.input(title, { target: { value: 'lorem ipstu' } });
        fireEvent.input(resume, { target: { value: 'lorem ipstu3' } });

        expect(previewContent.textContent).toEqual("testando")
        expect(previewTitlte.textContent).toEqual("lorem ipstu")
        expect(previewRusume.textContent).toEqual("lorem ipstu3")
    });
    it('When not send datas should render a h1 with "algo deu errado"', () => {
        render(
           
        );
       
     
        
    });
    it('should render Other type news correctly', () => {
        render(
          
        );
      
    });
    it('When not send datas should return "algo deu errado!" and not render the items', () => {
        render(
            
        );
    
    });
});
