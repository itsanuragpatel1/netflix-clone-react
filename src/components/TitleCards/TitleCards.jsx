import React from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import loading1 from '../../assets/loading2.gif'
import { useMovieContext } from '../../context/MovieContext'

const TitleCards = ({title,movies}) => {

    const {loading}=useMovieContext();

  return (
      
    <div className='title-cards'>
        <h2>{title?title:'Popular on Netflix'}</h2>
        <div className="card-list">
            {
                loading?(
                     <div className='loading-wrapper'>
                        <img src={loading1} alt="Loading..." style={{height:"40px",width:'fit-content'}}/>
                    </div>
                    
                ):(
                   movies?.map((card,index)=>{
                    return <Link to={`/player/${card.Title}`}> 
                    <div className="card" key={index} >
                                <img src={card.Poster} alt="" />   
                                <p >{card.Title}</p>                                      
                    </div>
                    </Link>
                    })
                )
                
            }
        </div>
    </div>
    
  )
}

export default TitleCards