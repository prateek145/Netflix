import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';


const base_url = "https://image.tmdb.org/t/p/original"

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl , settrailerUrl] = useState("")

    useEffect(()=>{
        async function fetchdata(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchdata();

    }, [fetchUrl])
    console.log(movies)

    const opts = {
      height: "390",
      width: "99%",
      playerVars: {
        autoplay: 1,
      },
    };

    
    
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            );
          })}
        </div>

        {/* container -> poster */}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    );
}
export default Row