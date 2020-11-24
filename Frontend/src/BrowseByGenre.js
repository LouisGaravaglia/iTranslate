import React,  {useState, useRef, useEffect, useCallback} from 'react';
import {Spring} from 'react-spring/renderprops';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
import LyricsTranslation from "./LyricsTranslation";
import Tracks from "./Tracks";
import LanguageSelect from "./LanguageSelect";
import Artists from "./Artists";
import Albums from "./Albums";
import Genres from "./Genres";
import Categories from "./BrowseCategories";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";
//CUSTOM HOOK IMPORTS
import useOnScreen from "./useOnScreen";

function BrowseByGenre({handleCategoryClick}) {
    //STATE FOR ANIMATIONS
  const [bgColor, setBgColor] = useState("#ABA800");
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
  const categoryRef = useRef();
  const selectGenresRef = useRef();
  const artistsResultsRef = useRef();
  const albumResultsRef = useRef();
  const selectLanguageRef = useRef();
  const trackResultsRef = useRef();
  const showLyricsTranslationRef = useRef();

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //GET ALL GENRES IN DB AND STORE THEM FOR THE BROWSE BY GENRE COMPONENT
  useEffect(() => {
    async function getSeedData() {
      dispatch(getGenres());
    }
    getSeedData();
  }, [dispatch]);


  //SKIP OVER THE CATEGORIES SINCE THE USER NEEDED TO SEE THAT IN ORDER TO GET TO THIS COMPONENT
  useEffect(() => {
    const scrollPastCategories = () => {
      selectGenresRef.current.scrollIntoView({behavior: "smooth"});
    }
    scrollPastCategories();
  }, []);

  //FUNCTION TO BE CALLED IN BELOW USE-EFFECTS TO SCROLL TO NEXT DIV AFTER CLICK
  const scrollToNextDiv = useCallback(async (state, ref) => {

    if (state && state !== "Could not read language value") {
      ref.current.scrollIntoView({behavior: "smooth"});
    }

  }, []);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(artists, artistsResultsRef);}, [artists, artistsResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO SEARCH RESULTS DIV WHEN RESULTS ARE SET IN STATE
  useEffect(() => {scrollToNextDiv(albums, albumResultsRef);}, [albums, albumResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LYRICS/TRANSLATION WHEN LANGUAGE HAS BEEN SELECTED AND SET IN STATE
  useEffect(() => {scrollToNextDiv(tracks, trackResultsRef);}, [tracks, trackResultsRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(lyrics, selectLanguageRef);}, [lyrics, selectLanguageRef, scrollToNextDiv]);

  //SCROLL DOWN TO LANGUAGE SEARCH BAR WHEN SELECTED TRACK HAS BE SET IN STATE
  useEffect(() => {scrollToNextDiv(translation, showLyricsTranslationRef);}, [translation, showLyricsTranslationRef, scrollToNextDiv]);

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const categoriesInView = useOnScreen(categoryRef, {threshold: 0.2});
  const genresInView = useOnScreen(selectGenresRef, {threshold: 0.2});
  const artistsInView = useOnScreen(artistsResultsRef, {threshold: 0.2});
  const albumsInView = useOnScreen(albumResultsRef, {threshold: 0.7});
  const selectLanguageInView = useOnScreen(selectLanguageRef, {threshold: 0.7});
  const trackResultsInView = useOnScreen(trackResultsRef, {threshold: 0.7});
  const LyricsTranslationInView = useOnScreen(showLyricsTranslationRef, {threshold: 0.2});


  useEffect(() => {
    const changeInView = (selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView, genresInView) => {
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
      } else if (genresInView) {
        setBgColor("#8019FF");
      }
    };
  changeInView(selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView, genresInView);
  }, [selectLanguageInView, albumsInView, trackResultsInView, LyricsTranslationInView, artistsInView, categoriesInView, genresInView]);

  const springProps = useSpring({
    backgroundColor: bgColor,
    config: {duration: 300}
  });

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

  const scrollToGenres = () => {
    selectGenresRef.current.scrollIntoView({behavior: "smooth"});
  }

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////



  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  const ChooseCategoryDiv = (
      <animated.div onClick={scrollToGenres} style={springProps} ref={categoryRef}>
               <Categories needAnimation={false}/>
      </animated.div>
  );

  //DISPLAY GENRES
  const selectGenresDiv = (
      <animated.div style={springProps} ref={selectGenresRef}>
        <Genres />
      </animated.div>
  );

  //DISPLAY ARTISTS FROM SELECTED GENRE
  let ArtistsResultsDiv;
  
  if (artists) ArtistsResultsDiv = (
    <animated.div style={springProps}  ref={artistsResultsRef}>
      <Artists />
    </animated.div>
  );

  //DISPLAY ALBUMS FROM SELECTED ARTIST
  let AlbumResultsDiv;
  
  if (albums) AlbumResultsDiv = (
    <animated.div style={springProps}   ref={albumResultsRef}>
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
          {selectGenresDiv}
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


export default BrowseByGenre;
