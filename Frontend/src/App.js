import React, {useEffect} from 'react';
import './App.css';
//COMPONENT IMPORTS
import Routes from "./Routes";
import Navbar from "./Navbar";
//REDUX IMPORTS
import {useDispatch} from "react-redux";
import {getLanguages} from "./actionCreators/getLanguagesCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    async function getSeedData() {
      //GET AVAILABLE LANGUAGES TO TRANSLATE LYRICS TO FROM IBM API
      dispatch(getLanguages());
      //GET ALL ARTISTS IN DB AND STORE THEM FOR THE BROWSE BY ARTISTS COMPONENT
      // dispatch(getAllArtists());
      //GET ALL GENRES IN DB AND STORE THEM FOR THE BROWSE BY GENRE COMPONENT
      // dispatch(getGenres());
    }

    getSeedData();
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
