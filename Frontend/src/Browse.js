import React from 'react';
import {useSpring, animated} from 'react-spring';
import './App.css';
//COMPONENT IMPORTS
import Categories from "./BrowseCategories";

function Browse() {

////////////////////////////////////////////////////  ANIMATION FOR BACKGROUND COLOR  ////////////////////////////////////////////////////

  const springProps = useSpring({
    backgroundColor: "#8700B0",
    config: {duration: 300}
  });

////////////////////////////////////////////////////  JSX VARIABLES  ////////////////////////////////////////////////////

  //DISPLAY BROWSE BY ARTISTS COMPONENTS
  let ChooseCategoryDiv = (
    <animated.div style={springProps}>
      <Categories needAnimation={true}/>
    </animated.div>
  );

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div>
      {ChooseCategoryDiv}
    </div>
  );
};

export default Browse;
