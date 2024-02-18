import React from 'react'
import styled from 'styled-components'

export default function VideoColumn({height, heading, data, playLive}) {
  const styleImg = {}
  if (height) {
    styleImg['height'] = height
  }
  return (
    <>
      <Heading>{heading}</Heading>
      <VideoContainer>
        {data && data.map((e, i)=>{
          let Category = e['original_title']?'movie':'tv'
          if (i<9) {
            return <img key={heading+e.id} style={styleImg} onClick={()=>{playLive(e.id, Category)}} id={e['id']} src={`https://image.tmdb.org/t/p/original${e['poster_path']}`} alt="" />
          }
        })}
      </VideoContainer>
    </>
  )
}
const Heading = styled.h2`
  color: #fff;
`
const VideoContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  /* gap: 10px; */
  img{
    width: 130px;
    /* height: 250px; */
    object-fit: cover;
    object-position: center;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
      scale: 0.9;
        border-radius: 10px;
    }
  }
`