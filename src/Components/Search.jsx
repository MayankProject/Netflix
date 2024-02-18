import {React, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import styled from 'styled-components'


export default function Search({search, setSearch, results, playLive, SearchCategory, setSearchCategory, removeLive}) {
  let content 

  if (results.results && results.results.length>0) {
      content = results.results.slice(0, 6).map((e)=>{
        let Category = e['original_title']?'movie':'tv'
        return <div className="search-result" onClick={()=>{playLive(e.id, Category)}} id={e['id']}>
                    <img src={`https://image.tmdb.org/t/p/original${e['poster_path']}`} alt="" />
                    <span>
                        <h3>{e['title']?e['title']:e['name']}</h3>
                        <p>{e["release_date"]?e['release_date']:e['first_air_date']}</p>
                    </span>
                </div>
        })
  }
  else{
    content = <h4 className='not-found'>{`Search not found for "${search}"`}</h4>
  }

  return (
    <>
    <div className="search-container">
    <HomeIcon className='home-icon' onClick={removeLive}></HomeIcon>
        <SearchContainer className='search-content'>
            <SearchIcon  onClick={SearchBar} className='search-icon' />
            <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            <select value={SearchCategory} onChange={(e)=>{setSearchCategory(e.target.value)}}>
                <option value="movie">Movie</option>
                <option value="tv">Shows</option>
            </select>
        </SearchContainer>
    </div>
        {
        search && 
        <Preview>
            { content }
        </Preview>
        }
    </>

  )
}
const SearchContainer = styled.div`
    /* position: absolute;   */
    /* left: 0vw; */
    overflow-x: hidden;
    /* width: 100%; */
    /* max-width: 100%; */
    width: 85%;
    /* translate: 50%; */
    z-index: 10;
    /* top: 20px; */
    transition: 0.2s;
    background: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 3px 10px;
    /* margin: 90px 0; */
    svg{
        font-size: 40px;
        transform: rotate(90deg);
        fill: black;
        transition: 0.2s;
        &:hover{
            scale: 1.07;
            cursor: pointer;
        }
    }
    input{
        flex: 1;
        font-size: 20px;
        padding: 10px;
        border: none;
        outline: none;
    }
    @media (max-width:720px){
        left: 10px;
        max-width: 80%;
        input{
            font-size: 15px;
        }
    }
    select:focus{
        outline: none;
    }
`


const SearchBar = function(){
    document.querySelector('.search-container').classList.toggle('active')
}

const Preview = styled.div`
    flex: 1;
    background: rgba(0, 0, 0, 1);
    position: absolute;
    z-index: 4;
    top: 100px;
    min-width: 500px;
    left: 7vw;
    padding: 20px;
    border: 2px solid red;
    display: flex;
    overflow-x: hidden;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    .search-result{
        display: flex;
        color: #fff;
        padding: 10px;
        gap: 20px;
        img{
            width: 80px;
            max-height: 100px;
            object-fit: cover;
        }
        p{
            opacity: 0.7;
        }
        &:hover{
            background: #1F1F1F;
            cursor: pointer;
        }
    }
    .not-found{
        color: white;
        max-width: 400px;
    }
`