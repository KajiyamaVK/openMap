import style from './stylesheet.module.css'
import PlaceRegisterForm from '../../public/components/PlaceRegisterForm'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function (){
    const router = useRouter();
    const [idPlace, setIdPlace] = useState(router.query.id);

    return(
        <div id={style.main}>
            <PlaceRegisterForm idPlace={idPlace}/>
        </div>
    )
}