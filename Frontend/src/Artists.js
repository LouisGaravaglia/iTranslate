import React from 'react';
import {Spring} from 'react-spring/renderprops';
import './Sass/App.scss';
//COMPONENT IMPORTS
import SearchResultList from "./SearchResultList";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./actionCreators/BrowseRoute/Artists/getAlbumsCreator";
import {resetStore} from "./actionCreators/resetStoreCreator";

function Artists({typeOfArtists}) {
  //REDUX STORE
  const dispatch = useDispatch();
  const artists = useSelector(store => store.artists);

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleArtistClick = async (artistId) => {
    dispatch(getAlbums(artistId));
    dispatch(resetStore("tracks", "lyrics", "translation"));
  }

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
              <SearchResultList key={artists[0].artistId} typeOfResults="artists" resultsArray={artists} handleSearch={handleArtistClick} itemsPerPage={1} typeOfArtists={typeOfArtists}/>
          </div>

        </div>
      )}
    </Spring>
  );
};

export default Artists;