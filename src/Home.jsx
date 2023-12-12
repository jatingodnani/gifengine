import React, { useEffect, useRef, useState } from 'react';
import { FaSearchPlus, FaPause, FaDownload, FaPlay } from 'react-icons/fa';
import { GetBysearch } from '../actions/api';

export default function Home() {
  const [onentrygate, setGate] = useState(null);
  const [pauseornot,setpause]=useState(false);
  const [inpu,setinpu]=useState(null);
  const [gifdata,setgifdata]=useState([]);
  const [id,setid]=useState();
  const [offset,setoffset]=useState(0)
  const videoRef = useRef(null);
  const [loadcount,setloadcount]=useState(0)
  const loadmoredata=async ()=>{
    setloadcount(prev=>prev+1)
    try{
console.log(loadcount)
      await GetBysearch(inpu,setgifdata,loadcount);
      }
      catch(error){
          console.log(error)
      }
  }
const getgifdata =async()=>{
try{
await GetBysearch(inpu,setgifdata,loadcount);
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
  const handlemoregifs=async(e)=>{

    
try{
if(window.innerHeight+document.documentElement.scrollTop+4>document.documentElement.scrollHeight){
    setoffset((prev)=>prev+25);

    console.log(offset,inpu)

    await GetBysearch(inpu,setgifdata,offset);
}
}catch(error){
 
console.log(error.messgae)
}
}
// useEffect(()=>{
//     window.addEventListener("scroll",handlemoregifs)
//     return ()=>window.removeEventListener("scroll",handlemoregifs)
// },[handlemoregifs])
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
      {
        gifdata.length>0 && <button onClick={loadmoredata} className='bg-blue-500 p-4 rounded font-bold w-[15%] text-white mt-[30px] ml-[35%]'>Load more gifs...</button>
      }
    </div>
  );
}



export function VideoPlayer({url,setGate,id,onentrygate,pause,videoRef,pauseornot,...props}){
  const [showPopup, setShowPopup] = useState(false);
  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      // Check if the response is OK (status code 200-299)
      if (!response.ok) throw new Error('Network response was not ok.');
  
      // Get the Blob from the response
      const blob = await response.blob( {"type" : "video/mp4"});
  
      // Log out blob type and size for debugging purposes
      console.log(`Blob type: ${blob.type}, Blob size: ${blob.size}`);
  
      // Ensure we have a GIF mime type before proceeding
    
  
      // Create an object URL for the Blob
      const downloadUrl = window.URL.createObjectURL(blob);
  
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "downloadedGif.gif";
      
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
  
    } catch (error) {
      
       console.error('Fetch error:', error.message);
    
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowPopup(false);
    }
  };
   return <div
   className='w-[200px] relative'
   onMouseLeave={() => {
     setGate(null)
   }}
   onMouseEnter={() => setGate(id)}
 >
   {onentrygate==id && (
     <div className='flex gap-2 absolute right-1.5 z-50 items-center top-2'>
       <FaSearchPlus onClick={()=>setShowPopup(true)}/>
       <div className='cursor-pointer'
        onClick={pause}
        >
       {!pauseornot ?
      <FaPause />:
       <FaPlay/>
       } 
       </div>
       <FaDownload onClick={handleDownload} />
     </div>
   )}
   {showPopup && (
        <div 
          onKeyDown={handleKeyDown}
          tabIndex={0}  // Make the div focusable to receive keyboard events
          className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50'
          style={{ backdropFilter: 'blur(5px)' }}  // Add blur effect
        >
          <div className='relative bg-white bg-opacity-80 p-4 rounded-lg'>  
            <div className='absolute z-50 top-6 right-6 flex gap-4'>
              <div className='cursor-pointer' onClick={()=>{
                
                pause()}}>
            {!pauseornot ?
      <FaPause />:
       <FaPlay/>
       } 
            </div>
            <FaDownload onClick={handleDownload} />
            </div>
            <video {...props} autoPlay width="300px" height="300px" loop muted ref={onentrygate === id ? videoRef : null}>
              <source type='video/mp4' src={url} />
            </video>
          </div>
        </div>
      )}
   <video {...props} autoPlay loop muted ref={onentrygate==id?videoRef:null} >
     <source
       type='video/mp4'
       src={url}
     />
   </video>
 
 </div>
}