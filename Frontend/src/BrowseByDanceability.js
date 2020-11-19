import React,  {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
//API IMPORTS
import SpotifyAPI from "./SpotifyAPI";
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import SliderDanceability from "./SliderDanceability";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
// import {getLyrics} from "./actionCreators/getLyricsCreator";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getDanceabilityTracks} from "./actionCreators/BrowseRoute/Danceability/getDanceabilityTracksCreator";

function BrowseByDanceability({handleNoAlbumsError}) {
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

  // //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  // useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

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

  const handleSliderMouseUp = async (val) => {
    console.log("Here is the val: ", val);
    let lowerLimit = (val - 0.10).toFixed(2);
    let upperLimit = (val + 0.10).toFixed(2);
    dispatch(getDanceabilityTracks(lowerLimit, upperLimit));
  }

  const handleTrackClick = async (artist, track, index) => {
    const base = tracks[index];
    setSelectedTrackId(base.id);
    dispatch(resetStore("translation"));

    try {
      //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
      //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
      const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData(base.id, selectedArtistId, selectedAlbumId);
      // dispatch(getLyrics(trackData, artistData, albumData, artist, track));
    } catch(e) {
      // const partialTrackData = { spotify_id: base.id, name: base.name, spotify_uri: base.uri, explicit: base.explicit, preview_url: base.preview_url  };
      // const partialArtistData = { spotify_id: base.artists[0].id, name: base.artists[0].name, spotify_uri: base.artists[0].uri };
      // dispatch(getLyrics(partialTrackData, partialArtistData, completeAlbumData, artist, track));
    }
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////


  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <div ref={trackResultsRef}>
      <SearchResultList key={tracks[0].spotify_id} typeOfResults="tracks" resultsArray={tracks} handleSearch={handleTrackClick} itemsPerPage={16}/>
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
        <SliderDanceability handleSliderMouseUp={handleSliderMouseUp} />
      </div>
      {TrackResultsDiv}
      {LyricsAndTranslationDivs}
  </>
  );
}

export default BrowseByDanceability;
