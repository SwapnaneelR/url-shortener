import { Button } from '../components/ui/button'
import  Heading from "../components/Heading";
import { useState } from 'react';
import axios from 'axios';
const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("URL submitted:", url);
    const res = await axios.post("http://localhost:5000/api/create", {
      url : url
    });
    if(res.data){
      console.log("Shortened URL:", res.data);
      setShortUrl(res.data);
    }
    else {
      console.error("Error shortening URL");
    }
  }  
  return (
    <div>
    <main className="flex flex-col items-center  bg-zinc-900 h-screen text-white px-4  pb-18">     
        <div className="mt-18   w-full max-w-xl">
          <span className="bg-gradient-to-r text-7xl font-bold mb-8 from-zinc-500 to-zinc-200 text-transparent bg-clip-text">
                  URL shortener
          </span> 
        <Heading />

          <form onSubmit={handleSubmit}
          className="flex items-center justify-center">
            <input
              onChange={(e) => setUrl(e.target.value)}
              value = {url}
              type="text"
              placeholder="Enter URL here"
              className="p-2 rounded-md bg-zinc-800 text-white w-full"
            />
            <Button
              variant={"secondary"}
              className="ml-6 px-4 py-2"
              type="submit"
            >
              Shorten
            </Button>
          </form>

          
        </div>
      </main>
    </div>
  )
}

export default Home