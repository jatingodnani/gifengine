import axios from "axios"

export const GetBysearch=async (query,setgifdata,offset,loadcount)=>{
   
    console.log(offset)
    const gfiapi=`https://api.giphy.com/v1/gifs/search?api_key=HhKHWFyKgKkVEIu6rHE2zjY2URlrEWyS&q=${query}&limit=25&offset=${offset*25}&rating=g&lang=en&bundle=messaging_non_clips`

    try {
        
        

        
        const response = await axios.get(gfiapi);

       

    setgifdata(prev=>[...prev,...response.data.data]);
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }
    
}

export const Trendingapi=async (setgifdata)=>{
   
  
  const gfiapi="https://api.giphy.com/v1/gifs/trending?api_key=HhKHWFyKgKkVEIu6rHE2zjY2URlrEWyS&limit=25&offset=0&rating=g&bundle=messaging_non_clips"

  try {
      
      

      
      const response = await axios.get(gfiapi);

     

  setgifdata(prev=>[...prev,...response.data.data]);
    } catch (error) {
      
      console.error('Error fetching data:', error);
    }
  
}

export const Randomgapi=async (setgifdata)=>{
   
  
  const gfiapi="https://api.giphy.com/v1/gifs/random?api_key=HhKHWFyKgKkVEIu6rHE2zjY2URlrEWyS&tag=&rating=g"

  try {
      
      

      
      const response = await axios.get(gfiapi);
console.log(response.data.data.id)
     

 setgifdata(response.data.data)
    } catch (error) {
      
      console.error('Error fetching data:', error);
    }
  
}

