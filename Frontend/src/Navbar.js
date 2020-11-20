import React from "react";
import {NavLink} from "react-router-dom";
import {resetStore} from "./actionCreators/resetStoreCreator";
import {useDispatch} from "react-redux";

const NavBar = () => {
    const dispatch = useDispatch();


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
        <div className="NavBar">
            <NavLink exact to="/" onClick={() => dispatch(resetStore("artists", "albums", "tracks", "lyrics", "translation", "searchResults", "selectedTrack")) }>Search</NavLink>
            <NavLink exact to="/browse">Browse</NavLink>
            {/* {publicNav() } */}
        </div>
    )
}

export default NavBar;