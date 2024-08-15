import React from 'react';
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { Insert } from '../pages/insert';
import '@testing-library/jest-dom'

const datas = 
  {
   resume:"lorem iptsu resumo",
   content:"lorem iptsu content",
   title:"lorem ipstu title"
  }
;



describe('List Component', () => {
    beforeAll(()=>{
      
    })
    it('should render Home type news correctly', () => {
        render(
            <Insert/>
        );
        const content = screen.queryByTestId("content")
        const previewContent  = screen.getByTestId("preview_content")
        const title = screen.getByTestId("title")
        const previewTitlte= screen.queryByTestId("preview_title")
        const resume = screen.queryByTestId("resume")
        const previewRusume = screen.queryByTestId("preview_resume")

        fireEvent.input(content, { target: { value: datas.content } });
        fireEvent.input(title, { target: { value: datas.title } });
        fireEvent.input(resume, { target: { value: datas.resume } });

        expect(previewContent.textContent).toEqual(datas.content)
        expect(previewTitlte.textContent).toEqual(datas.title)
        expect(previewRusume.textContent).toEqual(datas.resume)
    });
    it.only('verifica se os inputs permanem os memso apos clicar no button de adicionar subartigos', () => {
        render(
            <Insert/>
        );
        const btnMoreSubArt = screen.queryByTestId("moreSubArticles")
        const content = screen.queryByTestId("content")
        const previewContent  = screen.getByTestId("preview_content")
        const title = screen.getByTestId("title")
        const previewTitlte= screen.queryByTestId("preview_title")
        const resume = screen.queryByTestId("resume")
        const previewRusume = screen.queryByTestId("preview_resume")
        const divAdd_subArt =  screen.queryByTestId("add_subArt")

        fireEvent.input(content, { target: { value: datas.content } });
        fireEvent.input(title, { target: { value: datas.title } });
        fireEvent.input(resume, { target: { value: datas.resume } });

        expect(divAdd_subArt).not.toBeInTheDocument()
        expect(previewContent.textContent).toEqual(datas.content)
        expect(previewTitlte.textContent).toEqual(datas.title)
        expect(previewRusume.textContent).toEqual(datas.resume)
        
        fireEvent.click(btnMoreSubArt)
        waitFor(()=>{
            expect(divAdd_subArt).toBeInTheDocument()
            expect(previewContent.textContent).toEqual(datas.content)
            expect(previewTitlte.textContent).toEqual(datas.title)
            expect(previewRusume.textContent).toEqual(datas.resume)
        },1000)
      

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
