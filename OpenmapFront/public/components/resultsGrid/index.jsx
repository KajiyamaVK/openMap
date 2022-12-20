import style from './stylesheet.module.css'
import Cards from '../Cards'
import Pagination from '@mui/material/Pagination'
import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import getPlaces from '../../scripts/getPlaces.js'


export default function ({ data,callback, searchText }){

    const [currentPage,setCurrentPage] = useState(1);
    const [totalPlaces,setTotalPlaces] = useState(0);

    const [number_first_item_page,set_number_first_item_page] = useState(0);
    const [number_last_item_page,set_number_last_item_page] = useState(0);


    const handlePagination = async (event, page) => {
        const data = await getPlaces(0,searchText,page);
        setCurrentPage(page)
        console.log('mainsearch',data);
        if(data){
            callback(data)
        } else {
            callback([])
        }
    };

    useEffect(() => {
        if (data && data.length > 0) {
          setTotalPlaces(data[0]['totalRecords']);
          set_number_first_item_page(
            [currentPage] == 1 ? 1 : [currentPage] * 20 + 1
          );
          set_number_last_item_page(number_first_item_page + data.length - 1);
        }
        console.log(totalPlaces);
      }, [data]);

    useEffect(()=>{
        if(data && data.length > 0){
            setTotalPlaces(data[0]['totalRecords']);
            set_number_first_item_page(([currentPage] - 1) * 20 + 1);
    
            set_number_last_item_page(number_first_item_page + data.length - 1);
        }
    },[data, number_first_item_page, number_last_item_page])

    return(
        
        <div id={style.main}>
            
            <div>
                <Cards data={data}/>
            </div>
            { totalPlaces ?
            <div id={style.paginationContainer}>
                <Pagination 
                    count={Math.ceil(totalPlaces/20)} 
                    color="primary" 
                    onChange={handlePagination}
                    page={currentPage}
                />
                <Typography>Mostrando de {number_first_item_page} a {number_last_item_page}</Typography>
            </div> : <></>
            }
        </div>
    )
}