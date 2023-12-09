import axios from "axios"

export const GetBysearch=async (query,setgifdata)=>{
   
    const gfiapi=`https://api.giphy.com/v1/gifs/search?api_key=HhKHWFyKgKkVEIu6rHE2zjY2URlrEWyS&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`

    try {
        
        

        
        const response = await axios.get(gfiapi);

       

    setgifdata([...response.data.data]);
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }
    
}

