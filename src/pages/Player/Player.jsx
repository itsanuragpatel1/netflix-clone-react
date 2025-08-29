import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { Link, useParams } from 'react-router-dom'

const Player = () => {
let {name} =useParams();
console.log(name);
let [movieData,setMovieData]=useState({});


useEffect(()=>{
    let get_data=async ()=>{
        let response=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}%20trailer&type=video&maxResults=1&key=${import.meta.env.VITE_YOUTUBE_API}`);
        let data=await response.json();
        console.log(data);
        setMovieData((prevMovieData)=>{

            return {...prevMovieData,id:(data.items[0].id.videoId),publishTime:(data.items[0].snippet.publishTime)};
        })
    }

    get_data();

},[]);


  return (
    <div className='player'>
        <Link to={'/'}>
        <img src={back_arrow_icon} alt="" />
        </Link>

        <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${movieData.id}`} title='trailer' frameBorder='0' allowFullScreen></iframe>

        <div className="player-info">
            <p>{movieData.publishTime?(movieData.publishTime).slice(0,10):'Loading...'}</p>
            <p>{name}</p>
            <p>video</p>
        </div>

    </div>
  )
}

export default Player