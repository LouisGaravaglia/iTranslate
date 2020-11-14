import React,  {useState, useRef} from 'react';
import './App.css';
import SpotifyApi from "./SpotifyAPI";
import IBMWatsonAPI from './IBMWatsonAPI';
import LyricsAPI from "./LyricsAPI";
import Album from "./Album";
import Track from "./Track";




function Browse() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const albumsRef = useRef();
  const tracksRef = useRef();
  const lyricsTranslationRef = useRef();
  const artistsRef = useRef();


  const handleCategoryClick = async () => {
    artistsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  const handleArtistClick = async (artistID, artistName) => {
    albumsRef.current.scrollIntoView({
      behavior: "smooth",
    });
    const albums = await SpotifyApi.getAlbums(artistID);
    setAlbums(albums);
    setSelectedArtist(artistName);
    console.log("here are the alubms", albums);
  }

  const handleAlbumClick = async (albumID) => {
    tracksRef.current.scrollIntoView({
      behavior: "smooth",
    });
    const tracks = await SpotifyApi.getTracks(albumID);
    setTracks(tracks);
    console.log("here are the tracks", tracks);
  }

  const handleTrackClick = async (trackID, artist, track) => {
    lyricsTranslationRef.current.scrollIntoView({
      behavior: "smooth",
    });
    // const trackAnalysis = await SpotifyApi.getTrackAnalysis(trackID);
    const trackLyrics = await LyricsAPI.getLyrics(artist, track);
    setLyrics(trackLyrics);
    const translatedLyrics = await IBMWatsonAPI.getTranslation(trackLyrics);
    setTranslation(translatedLyrics);
  }

  return (
    <div className="Browse">
      <div className="Browse-Landing">
        <button onClick={handleCategoryClick}>Artists</button>
        <button onClick={handleCategoryClick}>Genre</button>
        <button onClick={handleCategoryClick}>Danceability</button>
      </div>
      <div className="Browse-Artists" ref={artistsRef}>
        {artists.map(artist => <button onClick={() => handleArtistClick(artist.id, artist.name)}>{artist.name}</button>)}
      </div>
      <div className="Browse-Albums" ref={albumsRef}>
        {albums.map(a => <Album className="Album" key={a.id} id={a.id} handleAlbumClick={handleAlbumClick} releaseDate={a.release_date} albumType={a.album_type} name={a.name} image={a.images[1].url}/>)}
      </div>
      <div className="Browse-Tracks" ref={tracksRef}>
        {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)}
      </div>
      <div className="Browse-Lyrics-Translation" ref={lyricsTranslationRef}>
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
