import style from './stylesheet.module.css'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button';
import { useState } from 'react';
import getPlaces from '../../scripts/getPlaces.js'

export default function({callback, searchText,setSearchText}){

    

    async function search(){
        const data = await getPlaces(0,searchText);
        console.log('mainsearch',data);
        if(data){
            callback(data)
        } else {
            callback([])
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          search();
        }
      };

    return(
        <div id={style.main}>
            
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="Para onde quer ir?" 
                variant="outlined" 
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <Button  id={style.btnSearch} variant="contained" startIcon={<SearchIcon/>} onClick={search}>
                Procurar
            </Button>

        </div>
    )
}