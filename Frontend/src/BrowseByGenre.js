import React,  {useRef, useEffect, useCallback} from 'react';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import LanguageSelect from "./LanguageSelect";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {getArtists} from "./actionCreators/BrowseRoute/Genre/getArtistsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

function BrowseByGenre() {
  //REDUX STORE
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.artists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  //REFS FOR PAGE TRAVERSAL
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const aritstResultsRef = useRef();
  const showLyricsTranslationRef = useRef();

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

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleGenreClick = async (genre) => {
    dispatch(getArtists({genre}));
    dispatch(resetStore("albums", "tracks", "lyrics", "translation"));
  }

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    dispatch(resetStore("tracks", "lyrics", "translation"));
  }

  const handleAlbumClick = async (albumId) => {
    dispatch(getTracks(albumId));
    dispatch(resetStore("lyrics", "translation"));
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY ARTISTS FROM SELECTED GENRE
  let ArtistResultsDiv;
  
  if (artists) ArtistResultsDiv = (
    <div className="Main-Container" ref={aritstResultsRef}>
        <SearchResultList key={artists[0].artistId} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={1}/>
    </div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <div className="Main-Container" ref={albumResultsRef}>
        <SearchResultList key={albums[0].albumId} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>
    </div>
  );

  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div className="Main-Container" ref={trackResultsRef}>
      <Tracks results={tracks} typeOfResults={"tracks"} itemsPerPage={1} />
    </div>
  );

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <div ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId}/>
    </div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <div ref={showLyricsTranslationRef}>
      <LyricsTranslation  />
    </div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className="Main-Container">
        <SearchResultList key={genres.length} typeOfResults="genres" resultsArray={genres} handleSearch={handleGenreClick} itemsPerPage={1}/>
      </div>
      {ArtistResultsDiv}
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
    </>
  );
}

export default BrowseByGenre;
