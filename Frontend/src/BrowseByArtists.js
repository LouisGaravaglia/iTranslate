import React, {useRef, useEffect, useCallback} from 'react';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

function BrowseByArtists({handleNoAlbumsError}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.allArtists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  //REFS FOR PAGE TRAVERSAL
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////



  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  // ***IF I DELETE THIS, REMOVE THE PROP BEING PASSED DOWN ABOVE****
  // //HANDLE ERROR MESSAGE IN CASE AN ARTIST IS LISTED THAT DOESN'T HAVE AN ALBUM ON SPOTIFY
  // useEffect(() => {
  //   const addFlashMessage = () => {
  //     if (albums && !albums[0]) handleNoAlbumsError();
  //   }
  //   addFlashMessage()
  // }, [albums]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    dispatch(resetStore("tracks", "lyrics", "translation"));
  }

  const handleAlbumClick = async (albumId) => {
    dispatch(getTracks(albumId));
    dispatch(resetStore("lyrics", "translation", "selectedTrack"));
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <div className="Main-Container" ref={albumResultsRef}>
      {albums[0] && <SearchResultList key={albums[0].albumId} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>}
    </div>
  );

  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div className="Main-Container" ref={trackResultsRef}>

      <Tracks results={tracks} typeOfResults={"tracks"} itemsPerPage={1} />
     
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
      <div className="Main-Container">
        <SearchResultList key={artists[0].artistId} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={1}/>
      </div>
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {LyricsAndTranslationDivs}
  </>
  );
}

export default BrowseByArtists;
