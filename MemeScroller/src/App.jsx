import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [memes, setMemes] = useState([]);

  // Function to load memes
  const loadMemes = async (count = 12) => {
    try {
      const response = await fetch(`https://meme-api.com/gimme/${count}`);
      const data = await response.json();

      setMemes((prevMemes) => [...prevMemes, ...data.memes]);
    } catch (error) {
      console.error("Failed to load memes:", error);
      alert("Couldn't load memes right now. Try again later!");
    }
  };

  // Load initial memes when component mounts
  useEffect(() => {
    loadMemes(12);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>MemeScroller</h1>
        <div className="breaker text">
          <p>Enter your search here...</p>
          <button>Search...</button>
        </div>
      </div>

      <div className="gallery" id="memeGallery">
        {memes.map((meme, index) => (
          <div key={index} className="meme-card">
            <img 
              src={meme.url} 
              alt={meme.title} 
              loading="lazy"
            />
            <div className="meme-info">
              <p><strong>{meme.title}</strong></p>
              <p>
                From: <a href={meme.postLink} target="_blank" rel="noopener noreferrer">
                  r/{meme.subreddit}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => loadMemes(12)} className="load-more-btn">
        Load More Memes
      </button>
    </div>
  );
}

export default App;