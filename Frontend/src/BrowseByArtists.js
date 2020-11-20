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
import {getLyricsFromDB} from "./actionCreators/getLyricsFromDBCreator";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {findLyricsFromAPI} from './actionCreators/findLyricsFromAPICreator';


function BrowseByArtists({handleNoAlbumsError}) {
  //REACT STATE
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState([]);
  const [completeAlbumData, setCompleteAlbumData] = useState({});
  //REDUX STORE
  const dispatch = useDispatch();
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.allArtists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
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

  useEffect(() => {
    const addFlashMessage = () => {
      if (albums && !albums[0]) handleNoAlbumsError();
    }
    addFlashMessage()
  }, [albums]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

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
      // dispatch(getLyrics(trackData, artistData, albumData, artist, track));

        // const partialTrackData = { spotify_id: base.trackId, name: base.trackName, spotify_uri: base.uri, explicit: base.explicit, preview_url: base.preview_url  };
      // const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
      // dispatch(getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track));

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <div ref={albumResultsRef}>
        {albums[0] && <SearchResultList key={albums[0].id} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3}/>}
    </div>
  );

  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div ref={trackResultsRef}>
      <SearchResultList key={tracks[0].trackId} typeOfResults="tracks" resultsArray={tracks} handleSearch={handleTrackClick} itemsPerPage={16}/>
      {/* {tracks.map(t => <Track key={t.id} id={t.id} handleTrackClick={handleTrackClick} trackName={t.name} artistName={selectedArtist}/>)} */}
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
        <SearchResultList key={artists[0].spotify_id} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={4}/>
      </div>
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {LyricsAndTranslationDivs}
  </>
  );
}

export default BrowseByArtists;
