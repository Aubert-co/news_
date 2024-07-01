import React,{useEffect} from "react"

export const DivShowWarning = ({showWarningDiv,setWarning})=>{
    
    useEffect(() => {
        if (showWarningDiv.msg) {
         
          const timer = setTimeout(() => {
          
            setWarning({ msg: '' ,color:""});
          }, 1000);
         
          return () => clearTimeout(timer);
        }
      }, [showWarningDiv.msg]);
     
      return showWarningDiv.msg && <h1 data-testid="warning" style={{ color:showWarningDiv.color }}>{showWarningDiv.msg}</h1>;
}