import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch} from "react-redux";
import MdArrowRoundForward from 'react-ionicons/lib/MdArrowRoundForward';
import MdArrowRoundBack from 'react-ionicons/lib/MdArrowRoundBack';


const NavBar = () => {
  const [browseMode, setBrowseMode] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickFromHome = () => {
      history.push("/browse") ;
      setBrowseMode(mode => !mode);
  }

    const handleClickFromBrowse = () => {
      history.push("/") ;
      setBrowseMode(mode => !mode);
  }


// const loggedInNav = () => {
//     return (
//         <>
//             <NavLink exact to="/companies">Companies</NavLink>
//             <NavLink exact to="/jobs">Jobs</NavLink>
//             <NavLink exact to="/profile">Profile</NavLink>
//             <NavLink exact to="/">Logout</NavLink>
//         </>
//     )
// }

// const publicNav = () => {
//     return (
//         <>
//             <NavLink exact to="/login" className="NavLink">Login</NavLink>
//             <NavLink exact to="/register">Register</NavLink>
//         </>
//     )
// }

  return (
    <div className="Navbar-Container">
      <div className="Navbar">

              <div className="Navbar-Search-Box">
      <NavLink  className="Navbar-Search" exact to="/" onClick={() => dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack")) }>LYRCS</NavLink>
        </div>

        <div className="Navbar-Browse-Box">
         
{!browseMode && <MdArrowRoundForward className="Navbar-Browse" onClick={() => handleClickFromHome()} fontSize="40px" color="#fff" />}
{browseMode && <MdArrowRoundBack className="Navbar-Browse" onClick={() => handleClickFromBrowse()} fontSize="40px" color="#fff" />}
 
        </div>




        <NavLink exact to="/browse">
        </NavLink>
        {/* {publicNav() } */}
      </div>
    </div>
  )
}

export default NavBar;