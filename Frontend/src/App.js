import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import Routes from "./Routes";
import Navbar from "./Navbar";
// import UserContext from "./UserContext";
import IBMWatsonAPI from "./IBMWatsonAPI";
import {getLanguages} from "./actionCreators/getLanguagesCreator";
import {getAllArtists} from "./actionCreators/BrowseRoute/Artists/getAllArtistsCreator";
import {getGenres} from "./actionCreators/BrowseRoute/Genre/getGenresCreator";



function App() {
  const dispatch = useDispatch();

  //GET AVAILABLE LANGUAGES TO TRANSLATE LYRICS TO FROM IBM API
  //
  useEffect(() => {

    async function getSeedData() {
      dispatch(getLanguages());
      dispatch(getAllArtists());
      dispatch(getGenres());
    }

    getSeedData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
