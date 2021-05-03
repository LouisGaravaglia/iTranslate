import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './sass/App.scss';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getTracks} from "./actionCreators/BrowseRoute/Artists/getTracksCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";
//CUSTOM HOOK IMPORTS
import useViewport from "./hooks/useViewport";

function Albums({typeOfAlbums}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const albums = useSelector(store => store.albums);
  //VIEWPORT SIZE BASED VARIABLES
  const {viewportWidth} = useViewport();
  let itemsPerPage;
  let albumKey;
  let deleteVal;

  //VIEWPORT BREAKPOINTS TO DETERMINT HOW MANY ALBUM COVERS TO DISPLAY AT ONCE
  if (viewportWidth < 1180 && viewportWidth > 780) {
    itemsPerPage = 2;
  } else if (viewportWidth < 780) {
    itemsPerPage = 1;
  } else {
    itemsPerPage = 3;
  };

  //ALBUM KEY WHICH WOULD CHANGE IF ITEMS PER PAGE CHANGED TO RERENDER COMPONENT IF NUMBER OF ALUMBS DISPLAYING IS CHANGING
  if (itemsPerPage < albums.length) {
    albumKey = itemsPerPage;
  } else {
    albumKey = 0;
  };

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
            <SearchResultList key={albums[albumKey].albumId} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={itemsPerPage} typeOfAlbums={typeOfAlbums}/>
          </div>

        </div>
      )}
    </Spring>
  );
};

export default Albums;