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

  const parseLyrics = () => {

  }

  const handleTrackClick = async (trackID, artist, track) => {
    // const trackAnalysis = await SpotifyApi.getTrackAnalysis(trackID);
    const trackLyrics = await LyricsApi.getLyrics(artist, track);
    setLyrics(trackLyrics);

    // const parsedLyrics = parseLyrics(lyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);

  }

  return (
    <div className="Browse">
      <div className="Browse-Artists">
        {artists.map(artist => <button onClick={() => handleArtistClick(artist.id, artist.name)}>{artist.name}</button>)}
      </div>
      <div className="Browse-Albums">
        {albums.map(a => <Album key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
      </div>
      <div className="Browse-Tracks">
        {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
      </div>
      <div className="Browse-Lyrics">
        <p>{lyrics}</p>
      </div>
    </div>
  );
}

export default Browse;
