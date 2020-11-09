import React,  {useState} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";
import Album from "./Album";


function Browse() {
  const [albums, setAlbums] = useState([]);

  const handleClick = async (artist) => {
    const artistID = await SpotifyApi.getArtistId(artist);
    const albums = await SpotifyApi.getAlbums(artistID);
    setAlbums(albums);
    console.log("here are the alubms", albums);


  }
  return (
    <div className="Browse">
       <button onClick={() => handleClick('J Balvin')}>J Balvin</button>
      <h1>Bad Bunny</h1>
      <h1>Maluma</h1>
      <h1>Rosalia</h1>
      {albums.map(a => <Album key={a.id} id={a.id} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}

    

    </div>
  );
}

export default Browse;
