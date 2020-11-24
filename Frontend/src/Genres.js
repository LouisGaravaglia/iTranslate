import React from 'react';
import { Spring } from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "./actionCreators/BrowseRoute/Genre/getArtistsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

function Genres() {
  //REDUX STORE
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

////////////////////////////////////////////////////  HANDLE CLICK AND SUBMIT FUNCTIONS  ////////////////////////////////////////////////////

  const handleGenreClick = async (genre) => {
    dispatch(getArtists({genre}));
    dispatch(resetStore("albums", "tracks", "lyrics", "translation"));
  }
////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div>
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{delay: 300, duration: 300}}
      >

      {props => (
        <div style={props}>
          
       <div className="Main-Container">
            <SearchResultList key={genres.length} typeOfResults="genres" resultsArray={genres} handleSearch={handleGenreClick} itemsPerPage={1}/>
          </div>         
        </div>
      )}

    </Spring>
  </div>
  );
};

export default Genres;
