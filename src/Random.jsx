import React,{useState,useRef} from 'react'
import { Randomgapi } from '../actions/api';
import { VideoPlayer } from './Home';

function Random() {
  const [each,setgifdata]=useState();
  const [pauseornot,setpause]=useState(false);
  const [onentrygate, setGate] = useState(null);
  const videoRef = useRef(null);
  console.log(each)
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
  const handlerandom=async()=>{
    try{
    await Randomgapi(setgifdata)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col gap-8'>

      <button
      onClick={handlerandom} className='rounded font-bold w-[50%] text-[25px] p-4 text-center bg-blue-500 text-white'>Get random gif</button>
{
  each&&

<VideoPlayer
                onentrygate={onentrygate}
                pause={pause}
                id={each?.id}
                videoRef={videoRef}
                pauseornot={pauseornot}
                setGate={setGate}
               key={each?.id}
                url={each?.images.original.mp4}
                width="400"
                height="400"
                />
}
    </div>

  )
}

export default Random