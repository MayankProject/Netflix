import React from 'react'
import styled from 'styled-components'

export default function Banner({bannerStyle, bannerInfo, playLive}) {
  let current = bannerInfo['results'][0]
  let Category = current['original_title']?'movie':'tv'
  return (
    <BannerComp style={bannerStyle}>
    <BannerContent>
      <h1>{current['name']?current['name']:current['title']}</h1>
      <div className='button-div'>
        <Button onClick={()=>{playLive(current['id'], Category)}}>
          Play Now
        </Button>
        <Button>
          My List
        </Button>
      </div>
      <p>{current['overview']}</p>
    </BannerContent>
  </BannerComp>
  )
}

const BannerComp = styled.div`
  height: 30rem;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  padding: 0px 7vw;
`
const BannerContent = styled.div`
  max-width: 600px;

  h1{
    color: white;
  }
  .button-div{
    display: flex;
    gap: 10px;
    margin: 15px 0;
  }
  button{
    padding: 10px 30px;
    background: rgba(0, 0, 0, 0.4);
    /* border: 1px solid rgba(255, 0, 0, 0.9); */
    border: none;
    color: white;
    outline: none;
    transition: 0.1s;
    &:hover{
      cursor: pointer;
      background-color: black;
    }
  }
  p{
    color: white;
    font-size: clamp(0.6875rem, 0.5858rem + 0.5085vw, 1.0625rem);
  }
`
const Button = styled.button``