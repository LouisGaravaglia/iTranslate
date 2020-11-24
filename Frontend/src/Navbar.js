import React, {useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch} from "react-redux";
import MdArrowRoundForward from 'react-ionicons/lib/MdArrowRoundForward';
import MdArrowRoundBack from 'react-ionicons/lib/MdArrowRoundBack';

const NavBar = () => {
  const [browseMode, setBrowseMode] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {

    const updateBrowseMode = () => {
        if (location.pathname === "/browse") setBrowseMode(true);
        if (location.pathname === "/browse/artists") setBrowseMode(true);
        if (location.pathname === "/browse/genres") setBrowseMode(true);
        if (location.pathname === "/browse/danceability") setBrowseMode(true);
        if (location.pathname === "/") setBrowseMode(false);
    };

    updateBrowseMode();
  }, []);

  const handleBrowseClickFromHome = () => {
    console.log("this is location: ", location);
    history.push("/browse") ;
    setBrowseMode(mode => !mode);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

  const handleBrowseClickFromBrowse = () => {
    dispatch(resetStore("lyrics", "translation", "searchResults"));
    history.push("/") ;
    setBrowseMode(mode => !mode);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

  const handleHomeClick = () => {
    history.push("/") ;
    setBrowseMode(false);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

  return (
    <div className="Navbar-Container">
      <div className="Navbar">
        <div className="Navbar-Search-Box">
          <NavLink  className="Navbar-Search" exact to="/" onClick={() => handleHomeClick()}>LYRCS</NavLink>
        </div>
        <div className="Navbar-Browse-Box">
          {!browseMode && <MdArrowRoundForward className="Navbar-Browse" onClick={() => handleBrowseClickFromHome()} fontSize="40px" color="#fff" />}
          {browseMode && <MdArrowRoundBack className="Navbar-Browse" onClick={() => handleBrowseClickFromBrowse()} fontSize="40px" color="#fff" />}
        </div>
        <NavLink exact to="/browse"></NavLink>
      </div>
    </div>
  )
}

export default NavBar;