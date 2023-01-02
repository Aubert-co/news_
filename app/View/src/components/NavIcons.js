import React ,{useEffect, useState}from 'react'
import { useParams} from 'react-router-dom'
import { Link  } from "react-router-dom";
import { generatePath} from "react-router";

import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GamesIcon from '@mui/icons-material/Games';
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';

const link = (url,value) => generatePath(url, {value,entity: "posts"});

const DEFAULT_ICONS = [
    {a:'Home',icon:<HomeIcon/>,category:'all',className:'itens active'},
    {a:'Esportes',icon:<SportsSoccerIcon/>,category:'sports',className:'itens'},
    {a:'Jogos',icon:<GamesIcon/>,category:'games',className:'itens'},
    {a:'Animais',icon:<PetsIcon/>,category:'animals',className:'itens'},
    {a:'Sobre',icon:<InfoIcon/>,category:'info',className:'itens'},
]
const mapItens = (arrayIcons,value)=>{
    return arrayIcons.map(({a,icon,category,className})=>{
        className ='itens'
        if(category === value )className = 'itens active'
        const linkS = category === 'all' ? '/' : `/news/category/${category}`
        const url = category === 'all' ? '/' : `/news/category/:value`
        return (
            <div className={className} key={a} >
               <Link to={linkS}> <i className='icons'>{icon} </i> </Link>
                { <Link  to={link(url,category)} className='icon_name'>{a}</Link> }
            </div>
        )
    })
}
export const NavIcons = ()=>{
    const {value} = useParams()
    const paramsUrl = value === undefined ? 'all': value
    const mapeedItens = mapItens(DEFAULT_ICONS,paramsUrl)
    const itens_primary = mapeedItens.slice(0,4)
    const itens_secondary =mapeedItens.slice(4,DEFAULT_ICONS.length)
    
    return (
        <nav>
            <div className='itens_primary'>
                {itens_primary}
            </div>

            <div className='itens_secondary'>
                {itens_secondary}
            </div>
        </nav>
    )
}