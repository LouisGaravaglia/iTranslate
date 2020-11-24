import React, {useState, useRef, useEffect} from 'react';
import {Spring} from 'react-spring/renderprops';
import {useSpring, animated} from 'react-spring';
import './App.css';

function Categories({handleCategoryClick, needAnimation}) {
  //REACT STATE
  const [category, setCategory] = useState("");
  const [bgColor, setBgColor] = useState("#ABA800");


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
