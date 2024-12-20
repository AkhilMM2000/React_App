import React,{useEffect,useState} from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY,Image_Url } from '../../constants/constant'
function Banner() {
const [movie,setMovie] = useState()
const randomnumber=()=>{
    return Math.floor(Math.random()*20)+1
}
    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
        )
        .then((response) => {
         
          const number=randomnumber()
        
          
          setMovie(response.data.results[number])
        });
    }, []);
    
    return (
        <div 
         className='banner' style={{backgroundImage:`url(${movie?
           Image_Url+ movie.backdrop_path:'null'
            })`}}>
            <div className='content' >
                <h1 className='title'>{movie?movie.title:'null'} </h1>
                <div className='banner_buttons' >
                    <button className='button' >Play</button>
                    <button className='button' >My list</button>
                </div>
                <h1 className='description'>{movie?movie.overview:''}</h1>
            </div>
        <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner
