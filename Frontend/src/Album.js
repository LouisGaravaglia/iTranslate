import React,  {useState} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";
import Track from "./Track";


function Album({image, name, releaseDate, albumType, id}) {
  const [tracks, setTracks] = useState([]);

  const handleClick = async () => {
    const tracks = await SpotifyApi.getTracks(id);
    setTracks(tracks);
    console.log("here are the tracks", tracks);
  }


  return (
    <div className="Album">
       <img onClick={() => handleClick('J Balvin')} src={image} alt=""/>
       <p>Album Name: {name}</p>
      <p>Album Type: {albumType}</p>
       <p>Release Date: {releaseDate}</p>
              <p>Album ID: {id}</p>
      {tracks.map(t => <Track key={t.id} id={t.id} name={t.name}/>)}

      
    

    </div>
  );
}

export default Album;
