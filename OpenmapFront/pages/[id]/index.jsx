import style from './stylesheet.module.css'
import PlaceRegisterForm from '../../public/components/PlaceRegisterForm'
import { useState } from 'react'

export default function (){
    const [idPlace, setIdPlace] = useState(null)

    return(
        <div id={style.main}>
            <PlaceRegisterForm idPlace={idPlace}/>
        </div>
    )
}