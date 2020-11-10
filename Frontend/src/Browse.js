import React,  {useState} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";
import IBMWatsonAPI from './IBMWatsonAPI';
import LyricsApi from "./LyricsAPI";
import Album from "./Album";
import Track from "./Track";
import { useSelector, useDispatch } from "react-redux";



function Browse() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const artists = useSelector(store => store.artists);
  const dispatch = useDispatch();

  const handleArtistClick = async (artistID, artistName) => {
    const albums = await SpotifyApi.getAlbums(artistID);
    setAlbums(albums);
    setSelectedArtist(artistName);
    console.log("here are the alubms", albums);
  }

  const handleAlbumClick = async (albumID) => {
    const tracks = await SpotifyApi.getTracks(albumID);
    setTracks(tracks);
    console.log("here are the tracks", tracks);
  }

  const handleTrackClick = async (trackID, artist, track) => {
    // const trackAnalysis = await SpotifyApi.getTrackAnalysis(trackID);
    const trackLyrics = await LyricsApi.getLyrics(artist, track);
    setLyrics(trackLyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    setTranslation(translatedLyrics);
  }

  return (
    <div className="Browse">
      <div className="Browse-Landing">
        <h1 className="Browse-Header">Artists</h1>
        <h1 className="Browse-Header">Genre</h1>
        <h1 className="Browse-Header">Danceability</h1>
      </div>
      <div className="Browse-Artists">
        {artists.map(artist => <button onClick={() => handleArtistClick(artist.id, artist.name)}>{artist.name}</button>)}
      </div>
      <div className="Browse-Albums">
        {albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
      </div>
      <div className="Browse-Tracks">
        {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
      </div>
      <div className="Browse-Lyrics-Translation">
        <div className="Browse-Lyrics-Container">
          <p className="Browse-Lyrics">ORIGINAL LYRICS</p>
          <p className="Browse-Lyrics">{lyrics}</p>
        </div>
        <div className="Browse-Translation-Container">
          <p className="Browse-Translation">TRANSLATED LYRICS</p>
          <p className="Browse-Translation">{translation}</p>
        </div>
      </div>
    </div>
  );
}

export default Browse;
