import React, {useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch} from "react-redux";
import MdMenu from 'react-ionicons/lib/MdMenu';
import MdSearch from 'react-ionicons/lib/MdSearch';

const NavBar = () => {
  const [browseMode, setBrowseMode] = useState(false);
  const [logoClassName, setLogoClassName] = useState("Navbar-Search");
  const [browseIconColor, setBrowseIconColor] = useState("#fff");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

////////////////////////////////////////////////////  USE EFFECT  ////////////////////////////////////////////////////

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

////////////////////////////////////////////////////  HANDLE CLICK FUNCTIONS  ////////////////////////////////////////////////////

  const handleBrowseClickFromHome = () => {
    history.push("/browse");
    setBrowseMode(mode => !mode);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

  const handleBrowseClickFromBrowse = () => {
    dispatch(resetStore("lyrics", "translation", "searchResults"));
    history.push("/");
    setBrowseMode(mode => !mode);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

  const handleHomeClick = () => {
    history.push("/");
    setBrowseMode(false);
    dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack"));
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className="Navbar-Container">
      <div className="Navbar">
        <div className="Navbar-Search-Box" onMouseEnter={() => setLogoClassName("Navbar-Search-Hover")} onMouseLeave={() => setLogoClassName("Navbar-Search")}>
          <NavLink  className={logoClassName} exact to="/" onClick={() => handleHomeClick()}>LYRCS</NavLink>
        </div>
        <div className="Navbar-Browse-Box">
          <div onMouseEnter={() => setBrowseIconColor("#000000")} onMouseLeave={() => setBrowseIconColor("#fff")}>
            {!browseMode && <MdMenu className="Navbar-Browse" onClick={() => handleBrowseClickFromHome()} fontSize="30px" color={browseIconColor}/>}
            {browseMode && <MdSearch  className="Navbar-Browse" onClick={() => handleBrowseClickFromBrowse()} fontSize="30px" color={browseIconColor}/>}
          </div>
        </div>
        <NavLink exact to="/browse"></NavLink>
      </div>
    </div>
  );
};

export default NavBar;