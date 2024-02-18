import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {RequestsUrl, baseUrl, apiKey} from '../Requests.js'
import VideoColumn from './VideoColumn.jsx';
import styled from 'styled-components'
import Search from './Search.jsx';
import Banner from './Banner.jsx';
import Live from './Live.jsx'

export default function Container() {
  const [AllData, setAllData] = useState([]);
  const [bannerInfo, setbannerInfo] = useState();
  const [SearchVal, setSearchVal] = useState("");
  const [SearchResults, setSearchResults] = useState([]);
  const [LiveUrl, setLive] = useState('');
  const [SearchCategory, setSearchCategory] = useState('movie');
  const [specificEpisode, setSpecificEpisode] = useState('s=1&e=1')
  const [currentId, setCurrentId] = useState('')
  
  useEffect(() => {
      fetchSearchResult()
  }, [SearchVal, SearchCategory]);

  useEffect(() => {
    if (currentId) {
      playLive(currentId, 'tv', specificEpisode)
    }
  }, [specificEpisode]);

  

  const setBanner = async (name, type, page)=>{
    name = name.split()
    name = name.join('%20')
    let url = `${baseUrl}/search/${type}?query=${name}&include_adult=true&api_key=${apiKey}&language=en-US&page=${page}`
    await fetch(url)
    .then(response => response.json())
    .then((response) => {
      console.log(response)
        setbannerInfo(response)
    })
  }
  
  const fetchSearchResult = async ()=>{
    let query = SearchVal.split()
    let page = 1
    query = query.join('%20')
    let url = `${baseUrl}/search/${SearchCategory}?query=${query}&api_key=${apiKey}&language=en-US&page=${page}&check=1`
    await fetch(url)
    .then(response => response.json())
    .then((response) => {
        setSearchResults(response)
    })
  }

  const fetchData = async () =>{
    let allResult = []
    for (const e of RequestsUrl) {
      let newDataObj = {}
      await fetch(e.url)
      .then(response => response.json())
      .then((response) => {
        newDataObj[e.title] = response
        allResult.push(newDataObj)
      })
    }
    setAllData(allResult)
  }

  const playLive = function(e, category){
    setCurrentId(e)
    setSearchCategory(category)
    if (category==='movie') {
      setLive(`https://multiembed.mov/directstream.php?video_id=${e}&tmdb=1`)
    }
    else{
      setLive(`https://multiembed.mov/directstream.php?video_id=${e}&tmdb=1&${specificEpisode}`)
    }
    setSearchVal('')
  }
  const removeLive = function(){
    setLive(undefined)
  }

  useEffect(() => {
    fetchData()
    setBanner('Barbie', 'movie', '1')
  }, []);

  const background_banner = {
    backgroundImage: bannerInfo?`linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/original${bannerInfo['results'][0]['backdrop_path']})`:''
  }
  return (
    <>
      <Search search={SearchVal} setSearch={setSearchVal} removeLive={removeLive} SearchCategory={SearchCategory} setSearchCategory={setSearchCategory} results={SearchResults} playLive={playLive}/>
      
      { LiveUrl ?
        <Live url={LiveUrl} currentId={currentId} SearchCategory={SearchCategory} setSpecificEpisode={setSpecificEpisode}/>:
      <>
        {bannerInfo && <Banner bannerStyle={background_banner} playLive={playLive} bannerInfo={bannerInfo} />}
        <Content>
          {AllData && <div className="column">
              {AllData.map((e, i)=>{
                let title = Object.keys(e)[0]
                let videoData = e[title].results
                if (i>0) {
                  return <VideoColumn heading={title} playLive={playLive} data={videoData} key={title} height="170px"/>
                }else{
                  return <VideoColumn heading={title} playLive={playLive} data={videoData} key={title}/>
                }
              })}
          </div>}
        </Content>
      </>}
    </>
  )
}
const Content = styled.div`
  background-color: #000;
  /* box-shadow: 0px -53px 33px 20px #000; */
  box-shadow: 0px -38px 27px 7px #000;
  position: relative;
  min-height: 50vh;
  background: black;
  
  .column{
    max-width: 95%;
    margin: auto;
  }
`
