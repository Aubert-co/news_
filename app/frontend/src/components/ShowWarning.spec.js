import React, { useState } from 'react';
import { render,fireEvent, screen, waitFor } from "@testing-library/react";
import { DivShowWarning } from './ShowWarning';
import '@testing-library/jest-dom'



describe('DivShoWarning',()=>{
    beforeEach(()=>{
        jest.useFakeTimers()
     
    })
    it("test",async()=>{
        const DEFAULT_PARAMS = {
            showWarningDiv:{msg:'Tudo certo!',color:'green'},
            setShowWarning:jest.fn()

        }
     
       
        render(
            <DivShowWarning showWarningDiv={DEFAULT_PARAMS.showWarningDiv} setWarning={DEFAULT_PARAMS.setShowWarning} />
        )
        const warning = screen.queryByTestId("warning")
        
        expect(warning).toBeInTheDocument()
        expect(warning.textContent).toEqual(DEFAULT_PARAMS.showWarningDiv.msg)
        expect(warning.style.color).toEqual(DEFAULT_PARAMS.showWarningDiv.color)
      
        await waitFor(()=>{
            expect(DEFAULT_PARAMS.setShowWarning).toHaveBeenCalledTimes(0)
    
            expect(screen.queryByTestId("warning")).toBeInTheDocument()
        },{timeout:4000})
        await waitFor(()=>{
            expect(DEFAULT_PARAMS.setShowWarning).toHaveBeenCalledTimes(1)
            expect(DEFAULT_PARAMS.setShowWarning).toHaveBeenCalledWith({msg:"",color:""})
          
        },{timeout:6001})
    })
   
})