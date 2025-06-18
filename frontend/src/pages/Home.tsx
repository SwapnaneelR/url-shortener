import { Button } from '../components/ui/button'
import  Heading from "../components/Heading";
import { useState } from 'react'; 
import axios from 'axios'; 

const Home = () => {
  const URL = import.meta.env.VITE_URL ;
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await window.navigator.clipboard.writeText(shortUrl);
    console.log("Copied to clipboard:", shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    const res = await axios.post(`${URL}/api/create`, {
      url : url
    });
    setUrl("");
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
    <main className="flex flex-col items-center z-10 min-h-screen text-white px-4  pb-18">     
        <div className="mt-18   w-full max-w-xl">
          <span className="bg-gradient-to-r text-7xl font-bold mb-8 from-zinc-500 to-zinc-200 text-transparent bg-clip-text">
                  URL shortener
          </span> 
        <Heading />

          <form onSubmit={handleSubmit}
          className="flex items-center mt-10 justify-center">
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
            <div className="mt-20">
        {shortUrl && (
          <div className="relative  group overflow-hidden rounded-xl border border-zinc-700 bg-transparent p-6 backdrop-blur-md transition duration-300 shadow-md">
            {/* Spotlight Glow Effect */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent)] opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-row gap-40">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 text-xl font-semibold hover:underline break-words"
              >
                {shortUrl}
              </a>

              <Button
                
                variant="ghost"
                className="  cursor-pointer text-lg font-itaic"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}
</div>


        </div>
    </main>
    </div>
  )
}

export default Home