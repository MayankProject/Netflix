import {React, useState, useEffect} from 'react'
import {RequestsUrl, baseUrl, apiKey} from '../Requests.js'

export default function Banner({url, SearchCategory, currentId, setSpecificEpisode}) {
  // let style = {maxWidth:'600px', width:"100%", height:'65vh'}
  
  const [AllSeasonDetail, setAllSeasonDetail] = useState('');
  const [allSeasonsTag, setAllSeasonsTag] = useState([]) // '["season/1", "season/2"]'
  const [currentInformation, setCurrentInformation] = useState('')


  const fetchSeasons = async ()=>{
    let url = `${baseUrl}/tv/${currentId}?api_key=${apiKey}&language=en-US&append_to_response=episode_groups`
    let allSeasonUrl = []
    await fetch(url)
    .then(response => response.json())
    .then((response) => {
      response['seasons'].forEach((season)=>{
        if (Number(season['season_number'])>0 && Number(season['season_number'])<21) {
          allSeasonUrl.push(`season/${season['season_number']}`)
        }
      })
    })
    setAllSeasonsTag(allSeasonUrl)
    allSeasonUrl = allSeasonUrl.join()
    url = `${baseUrl}/tv/${currentId}?api_key=${apiKey}&language=en-US&append_to_response=${allSeasonUrl}`
    await fetch(url)
    .then(response => response.json())
    .then((response)=>{
      let information = {
        showName: response['original_name'],
        title: response['original_name'],
        tagline: response['tagline'],
        overview: response['overview'],
      }
      setCurrentInformation(information)
      setAllSeasonDetail(response)
    })
  }
  const fetchMovieDetails = async ()=>{
    let url = `${baseUrl}/movie/${currentId}?api_key=${apiKey}&language=en-US`
    await fetch(url)
    .then(response => response.json())
    .then((response) => {
      let information = {
        title: response['title'],
        tagline: response['tagline'],
        overview: response['overview'],
      }
      setCurrentInformation(information)
    })
  }
  const allEpisodesContent = function(){
    let finalJsx = []
    allSeasonsTag.forEach((tag)=>{
      finalJsx.push(<h1 className='season-heading'>Season {AllSeasonDetail[tag]['season_number']}</h1>)
      AllSeasonDetail[tag]['episodes'].forEach((episode)=>{
        finalJsx.push(
          <div className='episode' onClick={()=>{playEpisode(`s=${AllSeasonDetail[tag]['season_number']}&e=${episode['episode_number']}`, episode, AllSeasonDetail[tag]['season_number'])}}>
            <img className='poster' src={`https://image.tmdb.org/t/p/original${episode['still_path']}`} alt="" />
            <div>
              <h2 className='episode-name'>S{AllSeasonDetail[tag]['season_number']}E{episode['episode_number']}: {episode['name']}</h2>
              <p className='episode-overview'>{episode['overview']}</p>
            </div>
          </div>
        )
      })
    })
    return finalJsx
  }
  const playEpisode = function(ep, episodeDetail, season){
    setCurrentInformation({
      ...currentInformation,
      title: `${currentInformation['showName']} (S${season}E${episodeDetail['episode_number']}) : ${episodeDetail['name']}`,
      tagline: undefined,
      overview: episodeDetail['overview'],
    })
    setSpecificEpisode(ep)
    window.scrollBy(0, -10000000)
  }


  useEffect(() => {
    if (SearchCategory==='tv') {
      fetchSeasons()
    }
    else{
       fetchMovieDetails()
    }
  }, [currentId]);

  return (
    <>
      <div className='player-container'>
          <iframe src={url} autoFocus frameBorder="0" allowFullScreen></iframe>
          {
            currentInformation &&
            <div className='currentPlayerInfo'>
              <h1 className='Title'>{currentInformation['title']} {currentInformation['tagline'] && <>: {currentInformation['tagline']}</>}</h1>
              <p className='overview'>{currentInformation['overview']}</p>
            </div>
          }
      </div>
      <hr />
      {
        AllSeasonDetail && 
          <div className='episodes-container'>
            <div className='episode-content'>
              {allEpisodesContent()}
            </div>
          </div>
      }
    </>
  )
}
