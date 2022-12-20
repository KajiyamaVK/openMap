import Head from 'next/head'
import { Inter } from '@next/font/google'
import MainSearch from '../public/components/mainSearch'
import ResultGrid from '../public/components/resultsGrid'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [searchResult,setSearchResult] = useState([])
  const [searchText,setSearchText] = useState('');

  return (
    <>
      <Head>
        <title>Open Map - Início</title>
        <link rel="icon" href="../images/favicon.png" />
      </Head>
      <MainSearch callback={setSearchResult} setSearchText={setSearchText} searchText={searchText}/>
      <ResultGrid data={searchResult} callback={setSearchResult} searchText={searchText}/>
    </>
  )
}
