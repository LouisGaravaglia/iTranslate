import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './App.css';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

function Albums({typeOfAlbums}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const albums = useSelector(store => store.albums);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleAlbumClick = async (albumId) => {
    dispatch(getTracks(albumId));
    dispatch(resetStore("lyrics", "translation"));
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{delay: 300, duration: 300}}
    >
      {props => (
        <div style={props}>

          <div className="Main-Container">
            <SearchResultList key={albums[0].albumId} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={3} typeOfAlbums={typeOfAlbums}/>
          </div>

        </div>
      )}
    </Spring>
  );
};

export default Albums;