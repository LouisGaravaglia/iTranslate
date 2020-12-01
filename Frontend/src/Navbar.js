import React, {useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch} from "react-redux";
import MdMenu from 'react-ionicons/lib/MdMenu';
import Hover from "./Hover";


const NavBar = () => {
  const [browseMode, setBrowseMode] = useState(false);
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
  }, [location.pathname, setBrowseMode]);

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
    <>
      <div className="Navbar-Container-Left">
        <div className="Navbar-Search-Box">
          <Hover scale={1.15}>
            <NavLink  className="Navbar-Search" exact to="/" onClick={() => handleHomeClick()}>LYRCS</NavLink>
          </Hover>
        </div>
      </div>
      <div className="Navbar-Container-Right">
        <div className="Navbar-Browse-Box">
          <Hover scale={1.20}>
            {!browseMode && <MdMenu className="Navbar-Browse" onClick={() => handleBrowseClickFromHome()} fontSize="35px" color="#fff"/>}
            {browseMode && <i  className="fa fa-search icon Navbar-Browse" onClick={() => handleBrowseClickFromBrowse()} color="#fff"></i>}
          </Hover>
        </div>
      </div>
    </>
  );
};

export default NavBar;