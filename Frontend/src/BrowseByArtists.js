import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Spring} from 'react-spring/renderprops';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import LanguageSelect from "./LanguageSelect";
import Albums from "./Albums";
import Categories from "./BrowseCategories";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";

function BrowseByArtists({handleNoAlbumsError, handleCategoryClick}) {
  //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#ABA800");
  //REDUX STORE
  const dispatch = useDispatch();
  const lyrics = useSelector(store => store.lyrics);
  const artists = useSelector(store => store.allArtists);
  const albums = useSelector(store => store.albums);
  const tracks = useSelector(store => store.tracks);
  const selectedTrackId = useSelector(store => store.selectedTrack.trackId);
  const translation = useSelector(store => store.translation);
  //REFS FOR PAGE TRAVERSAL
  const categoryRef = useRef();
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const showLyricsTranslationRef = useRef();
  const artistsResultsRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //SKIP OVER THE CATEGORIES SINCE THE USER NEEDED TO SEE THAT IN ORDER TO GET TO THIS COMPONENT
  useEffect(() => {
    const scrollPastCategories = () => {
      artistsResultsRef.current.scrollIntoView({behavior: "smooth"});
    }
    scrollPastCategories();
  }, []);


  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  // useEffect(() => {scrollToNextDiv(artists, artistsResultsRef);}, [artists, artistsResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

  // ***IF I DELETE THIS, REMOVE THE PROP BEING PASSED DOWN ABOVE****
  // //HANDLE ERROR MESSAGE IN CASE AN ARTIST IS LISTED THAT DOESN'T HAVE AN ALBUM ON SPOTIFY
  // useEffect(() => {
  //   const addFlashMessage = () => {
  //     if (albums && !albums[0]) handleNoAlbumsError();
  //   }
  //   addFlashMessage()
  // }, [albums]);

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const categoriesInView = useOnScreen(categoryRef, {threshold: 0.2});
  const artistsInView = useOnScreen(artistsResultsRef, {threshold: 0.2});
  const albumsInView = useOnScreen(albumResultsRef, {threshold: 0.7});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const trackResultsInView = useOnScreen(trackResultsRef, {threshold: 0.7});
  const LyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.2});


  useEffect(() => {
    const changeInView = (selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView) => {
      if (albumsInView) {
        setBgColor("#AB5D00");
      } else if (selectLanguageInView) {
        setBgColor("#ABA800");
      } else if (trackResultsInView) {
        setBgColor("#8019FF");
      } else if (LyricsTranslationInView) {
        setBgColor("#AB5D00");
      } else if (artistsInView) {
        setBgColor("#008FD1");
      } else if (categoriesInView) {
        setBgColor("#ABA800");
      }
    };
  changeInView(selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView);
  }, [selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });


////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    dispatch(resetStore("tracks", "lyrics", "translation"));
  }

  const scrollToGenres = () => {
    artistsResultsRef.current.scrollIntoView({behavior: "smooth"});
  };

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  const ChooseCategoryDiv = (
      <animated.div onClick={scrollToGenres} style={springProps} ref={categoryRef}>
               <Categories needAnimation={false}/>
      </animated.div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let ArtistsResultsDiv;
  
   if (artists) ArtistsResultsDiv = (
    <animated.div style={springProps}  ref={artistsResultsRef}>
      <div className="Main-Container">
        <SearchResultList key={artists[0].artistId} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={1}/>
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
      <Tracks results={tracks} typeOfResults={"tracks"} itemsPerPage={1} />
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
    <animated.div style={springProps}  ref={showLyricsTranslationRef}>
      <LyricsTranslation  />
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    // <Spring
    //   from={{opacity: 0}}
    //   to={{opacity: 1}}
    //   config={{delay: 300, duration: 300}}
    // >
    //   {props => (
    //     <div style={props}>
<>
          {ChooseCategoryDiv}
          {ArtistsResultsDiv}
          {AlbumResultsDiv}
          {TrackResultsDiv}
          {LanguageSelectDiv}
          {LyricsTranslationDiv}
</>
    //     </div>
    //   )}
    // </Spring>
  );
};


export default BrowseByArtists;
