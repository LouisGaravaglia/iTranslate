import React, {useState, useEffect} from 'react';
import {Spring} from 'react-spring/renderprops';
//API IMPORTS
import SpotifyAPI from "./SpotifyAPI";
import BackendCall from "./BackendCall";
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getLyricsFromDB} from "./actionCreators/getLyricsFromDBCreator";
import {findLyricsFromAPI} from "./actionCreators/findLyricsFromAPICreator";
import {addSelectedTrack} from "./actionCreators/addSelectedTrackCreator";
import {sendGeneralError} from "./actionCreators/sendGeneralErrorCreator";
//IONICONS IMPORTS
import IosMusicalNotes from 'react-ionicons/lib/IosMusicalNotes';

const Tracks = ({typeOfResults, results, itemsPerPage}) => {
  //REACT STATE
  const [isLoading, setIsLoading] = useState(false);
  //REDUX STORE
  const lyrics = useSelector(store => store.lyrics);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const dispatch = useDispatch();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //WATCHES FOR EITHER AN ERROR OR THE LYRICS TO COME THROUGH TO REMOVE LOADING ICON
  useEffect(() => {

    const updateIsLoading = () => {

      if (lyrics || lyricsError) setIsLoading(false);
    };
    updateIsLoading();
  }, [lyrics, lyricsError]);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleTrackResultsClick = async (track) => {
    const trackId = track.trackId;
    const artistId = track.artistId;
    const albumId = track.albumId;

    if (trackId !== selectedTrackId) {
      setIsLoading(true);
    };

    dispatch(addSelectedTrack(track));
    dispatch(resetStore("translation"));

    try {
      //MAKE CALL TO SPOTIFY API TO GET ADDITIONAL TRACK AND ARTIST INFO (GENRE, TEMPO, DANCEABILITY, ETC).
      //THIS ALSO MAKES THE PROCESS OF GETTING INFO FOR DB STREAMLINED SINCE WE ONLY NEED 3 ID'S
      if (track.hasLyrics) {
        dispatch(getLyricsFromDB(trackId));
      } else {
        if (track.inDatabase) {
          dispatch(findLyricsFromAPI(trackId, track.artistName, track.trackName));
        } else {
          const [trackData, artistData, albumData] = await SpotifyAPI.getTrackArtistAlbumData({trackId, artistId, albumId});
          await BackendCall.addTrackArtistAlbum(trackData, artistData, albumData);
          dispatch(findLyricsFromAPI(trackId, track.artistName, track.trackName));
        };
      };
    } catch(e) {
      setIsLoading(false);
      dispatch(sendGeneralError());
    };
  };

////////////////////////////////////////////////////  JSX  ////////////////////////////////////////////////////

  //DISPLAY LOADING ICON
  let LoadingIconDiv;
  
  if (isLoading) LoadingIconDiv = (
    <div className="Loading-Box">
      <IosMusicalNotes rotate={true} fontSize="300px" color="orange" />
    </div>
  );

  if (!isLoading) LoadingIconDiv = (
    <div className="Loading-Box"></div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>

          <SearchResultList key={results[0].id} typeOfResults={typeOfResults} resultsArray={results} handleSearch={handleTrackResultsClick} itemsPerPage={itemsPerPage} loadingIcon={LoadingIconDiv}/>

        </div>
      )}
    </Spring>
  );
};

export default Tracks;