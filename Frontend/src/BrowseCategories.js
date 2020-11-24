import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {NavLink, useHistory, useLocation} from "react-router-dom";
//REDUX IMPORTS
import {useDispatch, useSelector} from "react-redux";
import {resetStore} from "./actionCreators/resetStoreCreator";
import './App.css';

function Categories({needAnimation}) {
  const history = useHistory();
    //REDUX STORE
  const dispatch = useDispatch();

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

const handleCategoryClick = (category) => {
  // setCategory([category, {}]);
  console.log('INSIDE the handleCategoryClick', category);
  if (category === "Artists") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/artists") ;
  } else if (category === "Genre") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/genres") ;
  } else if (category === "Danceability") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/danceability") ;
  } else {
    console.log("yo no se");
  }
  // dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "selectedTrack"));
}

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
            <button onClick={() => handleCategoryClick("Artists")}>Artists</button>
            <button onClick={() => handleCategoryClick("Genre")}>Genre</button>
            <button onClick={() => handleCategoryClick("Danceability")}>Danceability</button>
          </div>

      </div>
    )}
  </Spring>
);

if (!needAnimation) CategoriesDiv = (
  <div className="Browse-Landing">
    <button onClick={() => handleCategoryClick("Artists")}>Artists</button>
    <button onClick={() => handleCategoryClick("Genre")}>Genre</button>
    <button onClick={() => handleCategoryClick("Danceability")}>Danceability</button>
  </div>
);

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
  {CategoriesDiv}
  </>
  );
}

export default Categories;
