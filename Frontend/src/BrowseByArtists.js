import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import LanguageSelect from "./LanguageSelect";
import Albums from "./Albums";
import Categories from "./BrowseCategories";
import FlashMessage from "./FlashMessage";
import ToTopArrow from "./ToTopArrow";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {resetLanguageError, resetTranslationError, resetLyricsError, resetGeneralError} from "./actionCreators/handleErrorsCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";
//IONICONS IMPORTS
import IosMusicalNotes from 'react-ionicons/lib/IosMusicalNotes';

function BrowseByArtists() {
  //REACT STATE
  const [bgColor, setBgColor] = useState("#4e1eff");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState("");
  //STATE FOR FLASH MESSAGES
  const [noLyricsFlashMessage, setNoLyricsFlashMessage] = useState(false);
  const [languageNotFoundFlashMessage, setLanguageNotFoundFlashMessage] = useState(false);
  const [translationErrorFlashMessage, setTranslationErrorFlashMessage] = useState(false);
  const [generalErrorFlashMessage, setGeneralErrorFlashMessage] = useState(false);
  //REDUX STORE
  const dispatch = useDispatch();
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.allArtists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  const translationError = useSelector(store => store.errors.translationError);
  const languageError = useSelector(store => store.errors.languageError);
  const lyricsError = useSelector(store => store.errors.lyricsError);
  const generalError = useSelector(store => store.errors.generalError);
  //REFS FOR PAGE TRAVERSAL
  const categoryRef = useRef();
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const showLyricsTranslationRef = useRef();
  const artistsResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //WATCHES FOR EITHER AN ERROR OR THE LYRICS TO COME THROUGH TO REMOVE LOADING ICON
  useEffect(() => {

    const updateIsLoading = () => {

      if (albums || generalError) setIsLoading(false);
    };
    updateIsLoading();
  }, [albums, generalError]);

  //LISTENS FOR ANY CHANGES IN ERRORS IN STATE AND WILL TRIGGER FLASH MESSAGES ACCORDINGLY
  useEffect(() => {

    const displayFlashMessage = () => {

        if (lyricsError) {
          setNoLyricsFlashMessage(true);
          dispatch(resetLyricsError());
        };
        if (languageError) {
          setLanguageNotFoundFlashMessage(true);
          dispatch(resetLanguageError());
        };
        if (translationError) {
          setTranslationErrorFlashMessage(true);
          dispatch(resetTranslationError());
        };
        if (generalError) {
          setGeneralErrorFlashMessage(true);
          dispatch(resetGeneralError());
        };
    };
    displayFlashMessage();
  }, [languageError, translationError, lyricsError, generalError, dispatch]);

  //GET ALL ARTISTS IN DB AND STORE THEM FOR THE BROWSE BY ARTISTS COMPONENT
  useEffect(() => {

    async function getSeedData() {
      dispatch(getAllArtists());
    };
    getSeedData();
  }, [dispatch]);

  //SKIP OVER THE CATEGORIES SINCE THE USER NEEDED TO SEE THAT IN ORDER TO GET TO THIS COMPONENT
  useEffect(() => {

    const scrollPastCategories = () => {
      artistsResultsRef.current.scrollIntoView({behavior: "smooth"});
    };
    scrollPastCategories();
  }, []);

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    };
  }, []);

  //SCROLL DOWN TO ALBUMS DIV WHEN ALBUMS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO TRACKS DIV WHEN TRACKS HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO SHOW LYRICS AND TRANSLATION WHEN TRANSLATION HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const categoriesInView = useOnScreen(categoryRef, {threshold: 0.2});
  const artistsInView = useOnScreen(artistsResultsRef, {threshold: 0.2});
  const albumsInView = useOnScreen(albumResultsRef, {threshold: 0.7});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const trackResultsInView = useOnScreen(trackResultsRef, {threshold: 0.7});
  const lyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.1});

  useEffect(() => {
    const changeInView = (selectLanguageInView, albumsInView, trackResultsInView, lyricsTranslationInView, artistsInView, categoriesInView) => {

      if (categoriesInView) {
        setBgColor("#4e1eff");
      } else if (artistsInView) {
        setBgColor("#7745f8");
      } else if (albumsInView) {
        setBgColor("#9d69f1");
      } else if (trackResultsInView) {
        setBgColor("#bd86eb");
      } else if (selectLanguageInView) {
        setBgColor("#dba3e6");
      } else if (lyricsTranslationInView) {
        setBgColor("#fdc3df");
      };


      //       if (categoriesInView) {
      //   setBgColor("#522df1");
      // } else if (artistsInView) {
      //   setBgColor("#5c2cf0");
      // } else if (albumsInView) {
      //   setBgColor("#7339ec");
      // } else if (trackResultsInView) {
      //   setBgColor("#9e67e3");
      // } else if (selectLanguageInView) {
      //   setBgColor("#ce92dd");
      // } else if (lyricsTranslationInView) {
      //   setBgColor("#f1b4d8");
      // };
    };
  changeInView(selectLanguageInView, albumsInView, trackResultsInView, lyricsTranslationInView, artistsInView, categoriesInView);
  }, [selectLanguageInView, albumsInView, trackResultsInView, lyricsTranslationInView, artistsInView, categoriesInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {

    if (artistId !== selectedArtistId) {
      setIsLoading(true);
      setSelectedArtistId(artistId)
    };
    dispatch(getAlbums(artistId));
    dispatch(resetStore("tracks", "lyrics", "translation"));
  };

  const scrollToArtists = () => {
    artistsResultsRef.current.scrollIntoView({behavior: "smooth"});
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

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

  //DISPLAY THE THREE CATEGORIES
  const ChooseCategoryDiv = (
    <animated.div onClick={scrollToArtists} style={springProps} ref={categoryRef}>
      <Categories needAnimation={false}/>
    </animated.div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let ArtistsResultsDiv;
  
  if (artists) ArtistsResultsDiv = (
    <animated.div style={springProps}  ref={artistsResultsRef}>
      <div className="Main-Container">
        <SearchResultList key={artists[0].artistId} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={1} loadingIcon={LoadingIconDiv} typeOfArtists="artists"/>
      </div>
    </animated.div>
  );

  if (!artists) ArtistsResultsDiv = (
    <animated.div style={springProps}  ref={artistsResultsRef}>
      <div className="Main-Container">
        <div className="Loading-Box">
          <IosMusicalNotes fontSize="300px" color="orange" />
        </div>
      </div>
    </animated.div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <animated.div style={springProps}  ref={albumResultsRef}>
      <Albums />
    </animated.div>
  );

  //DISPLAY TRACKS FROM SELECTED ALBUM
  let TrackResultsDiv;
  
  if (tracks) TrackResultsDiv = (
    <animated.div style={springProps}  className="Main-Container" ref={trackResultsRef}>
      <Tracks results={tracks} typeOfResults={"tracks"} itemsPerPage={1} animateIn={true} typeOfTracks="artists"/>
    </animated.div>
  );

  //DISPLAY LANGUAGE SELECTION SEARCH BAR
  let LanguageSelectDiv;

  if (lyrics) LanguageSelectDiv = (
    <animated.div style={springProps}  ref={selectLanguageRef}>
      <LanguageSelect selectedTrackId={selectedTrackId}/>
    </animated.div>
  );

  //DISPLAY LYRICS AND TRANSLATION
  let LyricsTranslationDiv;
  
  if (translation && translation !== "Could not read language value")  LyricsTranslationDiv = (
    <animated.div style={springProps}>
      <div className="inViewPlaceholder" ref={showLyricsTranslationRef}></div>
      <ToTopArrow topRef={categoryRef} topInView={categoriesInView}/>
      <LyricsTranslation  />
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className="Flash-Messages-Container">
        {noLyricsFlashMessage && (<FlashMessage setState={setNoLyricsFlashMessage} message="Unfortunately there are no Lyrics for that song yet."/> )}
        {languageNotFoundFlashMessage && (<FlashMessage setState={setLanguageNotFoundFlashMessage} message="That Language was not found, please try again."/> )}
        {translationErrorFlashMessage && (<FlashMessage setState={setTranslationErrorFlashMessage} message="Sorry, we couldn't get a translation at this moment."/> )}
        {generalErrorFlashMessage && (<FlashMessage setState={setGeneralErrorFlashMessage} message="Uh oh, something went wrong. Please try again."/> )}
      </div>
      {ChooseCategoryDiv}
      {ArtistsResultsDiv}
      {AlbumResultsDiv}
      {TrackResultsDiv}
      {LanguageSelectDiv}
      {LyricsTranslationDiv}
    </>
  );
};

export default BrowseByArtists;