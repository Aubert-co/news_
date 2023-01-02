import {useRef} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export const TopNav = ({setSearchValues})=>{
    const valueInput = useRef("")
    const clickSearch =()=>setSearchValues({search:valueInput.current.value})
    
   return(
    <div className="top_nav">
         <div className="show_nav">
            <i className="material-icons"> <MenuIcon/></i>
        </div>

        <div className="search_news">
            <div className="inputs_text">
                <input type="text" data-test="inputs" ref={valueInput} placeholder="busque uma noticia"></input>
            </div>
        

            <div className="material">
                <i className="material-icons" onClick={clickSearch} > <SearchIcon/></i>
            </div>
        </div>
    </div>
    )
}
