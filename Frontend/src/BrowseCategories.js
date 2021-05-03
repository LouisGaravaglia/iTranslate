import React from 'react';
import './sass/App.scss';
import {Spring} from 'react-spring/renderprops';
import {useHistory} from "react-router-dom";
//REDUX IMPORTS
import {useDispatch} from "react-redux";
import {resetStore} from "./actionCreators/resetStoreCreator";
//COMPONENT IMPORTS
import Hover from "./Hover";

function Categories({needAnimation}) {
  const history = useHistory();
  const dispatch = useDispatch();

////////////////////////////////////////////////////  CLICK EVENTS  ////////////////////////////////////////////////////

const handleCategoryClick = (category) => {

  if (category === "Artists") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/artists");
  } else if (category === "Genre") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/genres");
  } else if (category === "Danceability") {
    dispatch(resetStore("lyrics", "translation", "searchResults", "tracks", "artists", "albums"));
    history.push("/browse/danceability");
  };
};

////////////////////////////////////////////////////  JSX  ////////////////////////////////////////////////////

let CategoriesDiv;

if (needAnimation) CategoriesDiv = (
  <Spring
    from={{opacity: 0}}
    to={{opacity: 1}}
    config={{delay: 300, duration: 300}}
  >
    {props => (
      <div style={props}>

          <div className="Browse-Landing">
            <Hover scale={1.15}>
              <p className="Browse-Categories" onClick={() => handleCategoryClick("Artists")}>Artists</p>
            </Hover>
            <Hover scale={1.15}>
              <p className="Browse-Categories" onClick={() => handleCategoryClick("Genre")}>Genre</p>
            </Hover>
            <Hover scale={1.15}>
              <p className="Browse-Categories" onClick={() => handleCategoryClick("Danceability")}>Danceability</p>
            </Hover>
          </div>

      </div>
    )}
  </Spring>
);

if (!needAnimation) CategoriesDiv = (
  <div className="Browse-Landing">
    <Hover scale={1.15}>
      <p className="Browse-Categories" onClick={() => handleCategoryClick("Artists")}>Artists</p>
    </Hover>
    <Hover scale={1.15}>
      <p className="Browse-Categories" onClick={() => handleCategoryClick("Genre")}>Genre</p>
    </Hover>
    <Hover scale={1.15}>
      <p className="Browse-Categories" onClick={() => handleCategoryClick("Danceability")}>Danceability</p>
    </Hover>
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