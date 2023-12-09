import React from 'react'

function Actualtabcontainear({tabs,currenttab}) {
   
  return (
   <>
   {
    tabs.map((each)=>(
    currenttab==each.id &&<>{each.page()}</> 
    ))
   }
   </>
  )
}

export default Actualtabcontainear