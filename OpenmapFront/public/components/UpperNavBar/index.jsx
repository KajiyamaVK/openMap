import style from './stylesheet.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../images/logoxl.png'

export default function UpperNavBar(){
    return(
        <div id={style.main}>
            <Image
                    src={logo}
                    alt="Picture of the author"
                    width={70}
                    height={70}
                    loading='lazy'
                />
            <div id={style.linksContainer}>
                <Link href="/" style={{color:'black'}} underline='hover'>Início</Link> 
                <span className={style.dividers}>|</span>
                <Link href="/cadastro" style={{color:'black'}} underline='hover'>Cadastro</Link>
            </div>
        </div>
    )
}