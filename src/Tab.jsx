import React, { useState } from 'react'
import Home from './Home'
import Trending from './Trending'
import Random from './Random'
import Actualtabcontainear from "./Actualtabcontainear"
const tabs = [
    {
      id: "1",
      label: "Home",
      page: () => <Home />,
    },
    {
      id: "2",
      label: "Trending",
      page: () => <Trending />,
    },
    {
      id: "3",
      label: "Random",
      page: () => <Random />,
    },
  ];



function Tab() {
    const [currenttab,setcurrenttab]=useState("1");
    const toogle=(each)=>{
      
        setcurrenttab(each.id)
        
    }
  return (
    <div className='flex flex-col w-full gap-4'>
    <div className='flex flex-col gap-3   border-b-2'>
    <div className='flex w-[100%] gap-8 h-full'>
{tabs.map((each,index)=>(
    <div key={each.id} 
     onClick={()=>toogle(each)}
    className={`cursor-pointer text-lg px-2  py-2 ${currenttab===each.id?"font-bold  border-b-4 border-blue-500":"font-thin"}`}>{each.label}</div>
))}

    </div>
   
    </div>
    <Actualtabcontainear currenttab={currenttab} tabs={tabs}/>
    </div>
  )
}

export default Tab