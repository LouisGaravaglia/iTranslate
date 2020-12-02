import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './App.css';
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
  //VALUE OF VIEWPORT WIDTH
  const {viewportWidth} = useViewport();
  let itemsPerPage;
  //NEED TO USE A RANDOM NUMBER TO FORCE COMPONENT RERENDER SO THAT THE VALUE OF ALBUM SLIDER GETS RESET TO 0 ON VIEWPORT RESIZING
  const randomKeyForReRender = Math.random();

  //VIEWPORT BREAKPOINTS TO DETERMINT HOW MANY ALBUM COVERS TO VIEW AT ONCE
  if (viewportWidth < 1180 && viewportWidth > 770) {
    itemsPerPage = 2;
  } else if (viewportWidth < 780) {
    itemsPerPage = 1;
  } else {
    itemsPerPage = 3;
  }

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
            <SearchResultList key={randomKeyForReRender} typeOfResults="albums" resultsArray={albums} handleSearch={handleAlbumClick} itemsPerPage={itemsPerPage} typeOfAlbums={typeOfAlbums}/>
          </div>

        </div>
      )}
    </Spring>
  );
};

export default Albums;