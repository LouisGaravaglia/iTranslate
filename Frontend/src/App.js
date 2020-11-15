import React, {useEffect, useState} from 'react';
import './App.css';
import Routes from "./Routes";
import Navbar from "./Navbar";
import UserContext from "./UserContext";
import IBMWatsonAPI from "./IBMWatsonAPI";


function App() {
  const [languages, setLanguages] = useState("");

  //GET AVAILABLE LANGUAGES TO TRANSLATE LYRICS TO FROM IBM API
  useEffect(() => {
    async function getLanguages() {
      const res = await IBMWatsonAPI.getLanguages();
      console.log("my languages!!!: ", res);
      setLanguages(res);
    }
    getLanguages();
  }, []);


  return (
  <UserContext.Provider value={{languages}}>
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  </UserContext.Provider>
  );
}

export default App;
