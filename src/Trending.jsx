import React, { useEffect,useState,useRef } from 'react'
import { Trendingapi } from '../actions/api';
import { VideoPlayer } from './Home';

function Trending() {
  const [gifdata,setgifdata]=useState([]);
  const [pauseornot,setpause]=useState(false);
  const [onentrygate, setGate] = useState(null);
  const videoRef = useRef(null);
  const pause = () => {
    if (videoRef.current) {
        if (pauseornot) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
        setpause((prev) => !prev);
      }
  };
 useEffect(()=>{
handlegyi()
 },[])

async function handlegyi(){
  try{
   await Trendingapi(setgifdata)
  }catch(error){
     console.log(error)
  }
}
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>

{
            gifdata.map((each)=>(
                <VideoPlayer
                onentrygate={onentrygate}
                pause={pause}
                id={each.id}
                videoRef={videoRef}
                pauseornot={pauseornot}
                setGate={setGate}
               key={each.id}
                url={each.images.fixed_width.mp4}
                />
            ))
        }
    </div>
  )
}

export default Trending