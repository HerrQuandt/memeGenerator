import './App.css';
import { useState, useEffect, useRef } from 'react';
import DomToImage from 'dom-to-image';
import { saveAs } from 'file-saver';

function App() {

  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(1);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const fetchMemes = async () => {
    try {
    const res = await fetch('https://api.imgflip.com/get_memes');
    const data = await res.json()
    console.log(data.data.memes)
    setMemes(data.data.memes);
    } catch (error) {
      console.error(error);
    };
  };

  const saveMeme = () => {
    DomToImage.toBlob(
      document.getElementById("container")).then
    (function (blob) {
      window.saveAs(blob, "myMeme.png");
    })
  };
  
  useEffect(() => {
    fetchMemes();
  }, []);

const prevMeme = () => {
  setCurrentMeme((prev) => {
    if (prev === 0) {
      return memes.length - 1
    }
    return prev - 1;
  });
};
const nextMeme = () => {
  setCurrentMeme((prev) => {
    if (prev === memes.length - 1) {
      return 0
    }
    return prev + 1;
  });
};

const reset = () => {
  setBottomText("");
  setTopText("");
  setUploadedImage(null);
}

  return (
    <div className="App">
      <h1>The Quandtastic Meme Generator!</h1>
    <h4>Choose template:</h4>

      <div>
      <button class="glow-on-hover" type="button" onClick={prevMeme} >Previous</button>
      <button class="glow-on-hover" onClick={nextMeme}>Next</button>
      <br/>
      <button onClick={saveMeme}>Save Meme</button>
      </div>
      <br/>
      <br/>
    {uploadedImage ? (  
      <div id='container'>
    <img  
    src={URL.createObjectURL(uploadedImage)} 
    alt={memes[currentMeme]?.name}
    />
          <br/>
    <h3 className='top-text'>{topText}</h3>
    <h3 className='bottom-text'>{bottomText}</h3>
    </div>) : (
      <div id='container'>
      <img  
      src={memes[currentMeme]?.url} 
      alt={memes[currentMeme]?.name}
      />
            <br/>
      <h3 className='top-text'>{topText}</h3>
      <h3 className='bottom-text'>{bottomText}</h3>
      </div>
    )} 
    <h4>Add some funny Text:</h4>
    <input 
    value={topText} 
    onChange={(e) => setTopText(e.target.value)} 
    placeholder='Top Text' 
    />

    <input 
    value={bottomText} 
    onChange={(e) => setBottomText(e.target.value)} 
    placeholder='Bottom Text' 
    />
    <br/>
    <h4>Upload an Image and make your own Meme: </h4>
<input type='file' onChange={(e) => setUploadedImage(e.target.files[0])} />
    <br/>
    <br/>
<button onClick={reset}>Reset everything</button>
<br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
  );
}

export default App;
