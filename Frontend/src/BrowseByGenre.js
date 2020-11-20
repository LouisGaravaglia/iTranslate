import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//API IMPORTS
import SpotifyAPI from "./SpotifyAPI";
import BackendCall from "./BackendCall";
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
// import {getLyrics} from "./actionCreators/getLyricsCreator";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {getArtists} from "./actionCreators/BrowseRoute/Genre/getArtistsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {findLyricsFromAPI} from "./actionCreators/findLyricsFromAPICreator";
import {getLyricsFromDB} from "./actionCreators/getLyricsFromDBCreator";

function BrowseByGenre() {
  //REACT STATE
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState([]);
  const [completeAlbumData, setCompleteAlbumData] = useState({});
  //REDUX STORE
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.artists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  //REFS FOR PAGE TRAVERSAL
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const aritstResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(artists, aritstResultsRef);}, [artists, aritstResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleGenreClick = async (genre) => {
    dispatch(getArtists({genre}));
    dispatch(resetStore("albums", "tracks", "lyrics", "translation"));
    setSelectedTrackId("");
  }

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    setSelectedArtistId(artistId);
    dispatch(resetStore("tracks", "lyrics", "translation"));
    setSelectedTrackId("");
  }

  const handleAlbumClick = async (albumId, index) => {
    setSelectedAlbumId(albumId);
    const base = albums[index];
    setCompleteAlbumData({ spotify_id: base.id, name: base.name, release_date: base.release_date, spotify_uri: base.uri, img_url: base.images[1].url})
    dispatch(getTracks(albumId));
    dispatch(resetStore("lyrics", "translation"));
    setSelectedTrackId("");
  }

  const handleTrackClick = async (track) => {
    setSelectedTrackId(track.trackId);
    dispatch(resetStore("translation"));

    try {
      //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
      //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
      if (track.hasLyrics) {
        dispatch(getLyricsFromDB(track.trackId));
      } else {
        if (track.inDatabase) {
          dispatch(findLyricsFromAPI(track.trackId, track.artistName, track.trackName));
        } else {
          const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(track.trackId, track.artistId, track.albumId);
          const response = await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);
          dispatch(findLyricsFromAPI(track.trackId, track.artistName, track.trackName));
        }
      }
    } catch(e) {  
      //*** NEED TO ADD A "NO LYRICS" FLASH MESSAGE FOR HANDLING A SPOTIFY API ERROR */
    }
  }

      // try {
    //   //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
    //   //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
    //   const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(base.id, selectedArtistId, selectedAlbumId);
    //   dispatch(getLyrics(trackData, artistData, albumData, artist, track));
    // } catch(e) {
    //   const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, preview_url: base.preview_url  };
    //   const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
    //   dispatch(getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track));
    // }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY ARTISTS FROM SELECTED GENRE
  let ArtistResultsDiv;
  
  if (artists) ArtistResultsDiv = (
    <div ref={aritstResultsRef}>
        <SearchResultList key={artists[0].spotify_id} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={3}/>
    </div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <div ref={albumResultsRef}>
        <SearchResultList key={albums[0].id} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>
    </div>
  );

  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div ref={trackResultsRef}>
      <SearchResultList key={tracks[0].trackId} typeOfResults="tracks" resultsArray={tracks} handleSearch={handleTrackClick} itemsPerPage={16}/>
    </div>
  );

  let LyricsAndTranslationDivs;

  if (selectedTrackId) LyricsAndTranslationDivs = (
    <div ref={selectLanguageRef}>
      <LyricsTranslation selectedTrackId={selectedTrackId} />
    </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div>
        <SearchResultList key={genres.length} typeOfResults="genres" resultsArray={genres} handleSearch={handleGenreClick} itemsPerPage={5}/>
      </div>
      {ArtistResultsDiv}
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {LyricsAndTranslationDivs}
    </>
  );
}

export default BrowseByGenre;
