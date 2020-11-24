import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {useHistory} from "react-router-dom";
//REDUX IMPORTS
import {useDispatch} from "react-redux";
import {resetStore} from "./actionCreators/resetStoreCreator";
import './App.css';

function Categories({needAnimation}) {
  const history = useHistory();
  const dispatch = useDispatch();

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

const handleCategoryClick = (category) => {

  if (category === "Artists") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/artists") ;
  } else if (category === "Genre") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/genres") ;
  } else if (category === "Danceability") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/danceability") ;
  };
};

////////////////////////////////////////////////////  JSX  ////////////////////////////////////////////////////

let CategoriesDiv;

if (needAnimation) CategoriesDiv = (
  <Spring
    from={{opacity: 1, marginLeft: 2500}}
    to={{opacity: 1, marginLeft: 0}}
    reverse={false}
    config={{delay: 0, duration: 200}}
  >
    {props => (
      <div style={props}>

          <div className="Browse-Landing">
            <p onClick={() => handleCategoryClick("Artists")}>Artists</p>
            <p onClick={() => handleCategoryClick("Genre")}>Genre</p>
            <p onClick={() => handleCategoryClick("Danceability")}>Danceability</p>
          </div>

      </div>
    )}
  </Spring>
);

if (!needAnimation) CategoriesDiv = (
  <div className="Browse-Landing">
    <p onClick={() => handleCategoryClick("Artists")}>Artists</p>
    <p onClick={() => handleCategoryClick("Genre")}>Genre</p>
    <p onClick={() => handleCategoryClick("Danceability")}>Danceability</p>
  </div>
);

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      {CategoriesDiv}
    </>
  );
};

export default Categories;
