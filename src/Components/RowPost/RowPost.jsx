import React ,{useEffect,useState}from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, Image_Url} from '../../constants/constant'

import YouTube from 'react-youtube'
function RowPost(props) {
  console.log(props);
  
const [movies,setMovies]=useState([])
const [Urlid,setUrlId]=useState('')
    useEffect(() => {
      axios.get(props.url).then(respose=>{
       
         
        setMovies(respose.data.results)
       
        
      }).catch(err=>{
alert('no network')
      })
    }, [])
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
    
        autoplay: 1,
      },
    };
  const handleMoveClick=(id)=>{
   
    
   axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
    
        if(response.data.results.length!==0){
               setUrlId(response.data.results[0])
        }
    
   })
   
  }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
            {movies.map(obj=>{
               
                
               return <img onClick={()=>handleMoveClick(obj.id)} className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${Image_Url+obj.backdrop_path}`}/>
             
                
            })}
            </div>
           {Urlid&& <YouTube videoId={Urlid.key} opts={opts}/>}
        </div>
        
    )
}

export default RowPost
