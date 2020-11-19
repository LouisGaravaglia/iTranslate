import React, {useEffect} from 'react';
import './App.css';
//COMPONENT IMPORTS
import Routes from "./Routes";
import Navbar from "./Navbar";
//REDUX IMPORTS
import {useDispatch} from "react-redux";
import {getLanguages} from "./actionCreators/getLanguagesCreator";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    async function getSeedData() {
      //GET AVAILABLE LANGUAGES TO TRANSLATE LYRICS TO FROM IBM API
      dispatch(getLanguages());
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
