import React, {useEffect} from 'react';
import { Spring } from 'react-spring/renderprops';
import './Sass/App.scss';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "./actionCreators/BrowseRoute/Genre/getArtistsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";

function Genres({fontColor1, fontColor2}) {
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

////////////////////////////////////////////////////  USE EFFECTS  ////////////////////////////////////////////////////

  //GET ALL GENRES IN DB AND STORE THEM FOR THE BROWSE BY GENRE COMPONENT
  useEffect(() => {

    async function getSeedData() {
      dispatch(getGenres());
    }
    getSeedData();
  }, [dispatch]);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleGenreClick = async (genre) => {
    dispatch(getArtists({genre}));
    dispatch(resetStore("albums", "tracks", "lyrics", "translation"));
  };

////////////////////////////////////////////////////  JSX  ////////////////////////////////////////////////////

  //DISPLAY GENRES
  let GenresDiv;
  
  if (genres) GenresDiv = (
    <div className="Main-Container">
      <SearchResultList key={genres.length} typeOfResults="genres" resultsArray={genres} handleSearch={handleGenreClick} itemsPerPage={1} fontColor1={fontColor1} fontColor2={fontColor2}/>
    </div>  
  );

  if (!genres) GenresDiv = (
    <p>Loading</p>
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
          
          {GenresDiv}

        </div>
      )}
  </Spring>
  );
};

export default Genres;