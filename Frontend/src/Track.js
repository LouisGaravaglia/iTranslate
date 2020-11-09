import React,  {useState} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";


function Track({name, id}) {
  const [albums, setAlbums] = useState([]);

  const handleClick = async () => {



  }

  return (
    <div className="Track">
       <button onClick={handleClick}>{name}</button>
      
    

    </div>
  );
}

export default Track;
