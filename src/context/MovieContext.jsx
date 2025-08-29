import { createContext, useContext, useEffect, useState } from "react";
import imdb_list from '../assets/imdb_list.js'
import toast from "react-hot-toast";

export const MovieContext=createContext();

export const MovieContextProvider=({children})=>{

    const [loading,setLoading]=useState(true);
    const [moviesall,setMoviesall]=useState([]);

    useEffect(()=>{
        const getMovie=async ()=>{
           
            let movies=[];
            while(movies.length!=60){
                let randomNumber=Math.floor(Math.random() *200);
                let imdbId=imdb_list[randomNumber];
                if(!movies.includes(imdbId)){
                    movies.push(imdbId);
                }
            }

            let movieData=await Promise.all(
                movies.map(async(id)=>{
                    try {
                        let response=await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API}&i=${id}`)
                        let data=await response.json();
                        return data;
                    } catch (error) {
                        return null;
                    }
                })
            )

            let finalData=movieData.filter((movie)=>{
                return (movie && movie.Response=='True')
            });

            
            while(finalData.length<50){
                let randomNumber=Math.floor(Math.random() *285);
                let imdbId=imdb_list[randomNumber];
                if(!movies.includes(imdbId)){
                    movies.push(imdbId);
                    let response=await fetch(`https://www.omdbapi.com/?apikey=ecbf37d5&i=${imdbId}`)
                    let data=await response.json();
                    if(data){
                        finalData.push(data);
                    }
                }
            }

            const filterMovies=finalData.filter((movie)=>{
                return (movie && movie.Response=='True')
            });

            if(filterMovies.length==0){
                toast.error("Internl Server Error")
            }

            setMoviesall([...filterMovies]);


            setLoading(false)

        }

        
        // console.log("hello");
        getMovie();
    },[])

    return(
        <MovieContext.Provider value={{moviesall,loading}} >
            {children}
        </MovieContext.Provider>
    )
}

export const useMovieContext=()=>useContext(MovieContext);



