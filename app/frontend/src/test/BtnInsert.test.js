import React from 'react';
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BtnInsert } from '../components/BtnInsert';
import * as Service from '../service/index'

const mockDatas = {
    title:"lorem isptu title",
    category:"categoryind lorem ipstu",
    resume:"resumem",
    imgPath:"test"
}
const mockElements = [
    {
        title:"lorem isptu title1",
        category:"categoryind lorem ipstu1",
        resume:"resumem1",
     
    },
    {
        title:"lorem isptu title2",
        category:"categoryind lorem ipstu2",
        resume:"resumem2",
     
    }
]

describe('List Component', () => {
    beforeAll(()=>{
      
    })
    
    it('should render Home type news correctly', () => {
        const setWarningDiv = ()=>{}
        const Services = jest.spyOn(Service,'ApiInsert')
        render(
            <BtnInsert setWarningDiv={setWarningDiv} InputValues={{news:mockDatas,elements:mockElements}}></BtnInsert>
        );
        const btn = screen.queryByTestId("insertDatas")

        fireEvent.click(btn)

        expect(Services).toHaveBeenCalledWith("{news}")
       
    });
  
});
