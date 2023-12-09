import React, { useRef, useState } from 'react';
import { FaSearchPlus, FaPause, FaDownload, FaPlay } from 'react-icons/fa';
import { GetBysearch } from '../actions/api';

export default function Home() {
  const [onentrygate, setGate] = useState(null);
  const [pauseornot,setpause]=useState(false);
  const [inpu,setinpu]=useState(null);
  const [gifdata,setgifdata]=useState([]);
  const [id,setid]=useState()
  const videoRef = useRef(null);
const getgifdata =async()=>{
try{
// await GetBysearch(inpu,setgifdata);
}
catch(error){
    console.log(error)
}

}
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

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-4 w-full'>
        <p>This is the home page. Search any GIF you want!</p>
        <div className='flex gap-2'>
          <input type='text' className='w-full rounded-sm p-2 border border-1' onChange={(e)=>{
            setinpu(e.target.value.trim())
          }} placeholder='Search GIFs...' />
          <button onClick={getgifdata} className='bg-blue-500 text-white p-2 capitalize font-medium l rounded' >search</button>
        </div>
      </div>
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
    </div>
  );
}



export function VideoPlayer({url,setGate,id,onentrygate,pause,videoRef,pauseornot}){
 
   return <div
   className='w-[200px] relative'
   onMouseLeave={() => {
     setGate(null)
   }}
   onMouseEnter={() => setGate(id)}
 >
   {onentrygate==id && (
     <div className='flex gap-2 absolute right-1.5 z-50 items-center top-2'>
       <FaSearchPlus />
       <div className='cursor-pointer'
        onClick={pause}
        >
       {!pauseornot ?
      <FaPause />:
       <FaPlay/>
       } 
       </div>
       <FaDownload />
     </div>
   )}
   <video autoPlay loop muted ref={onentrygate==id?videoRef:null} >
     <source
       type='video/mp4'
       src="https://media4.giphy.com/media/SYQFjIKXTL6f2HoJIh/giphy.mp4?cid=bd88e57f86zqh9yfpbndi7dzxcl77ppofeab6akfz6wsk7xj&ep=v1_gifs_search&rid=giphy.mp4&ct=g"
     />
   </video>
 </div>
}