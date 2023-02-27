import React, { useState, useEffect } from 'react';
import axios from 'jest-mock-axios';
import './App.css';

function App() {
  // useState hook to define a state variable called "memes" and its initial value as an empty array
  const [memes, setMemes] = useState([]);

  // useEffect hook to fetch data from the Imgflip API endpoint only once on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // fetch data using the axios library
        const response = await axios.get('https://api.imgflip.com/get_memes');
        // update the state variable "memes" with the response data from the API
        setMemes(response.data.data.memes);
      } catch (error) {
        // log any errors that occur during the API request
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // return JSX containing the meme templates fetched from the API
  return (
    <div className="container">
      <h1 className="title">Meme Templates</h1>
      <div className="memes-container">
        {memes.map(meme => (
          // map over the "memes" array to render each meme template with its name and image
          <div key={meme.id} className="meme-card">
            <img src={meme.url} alt={meme.name} className="meme-image" />
            <p className="meme-name">{meme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export the App component to be used in other parts of the application
export default App;