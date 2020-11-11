import React from "react";
import {NavLink} from "react-router-dom";


const NavBar = () => {


    const loggedInNav = () => {
        return (
            <>
                <NavLink exact to="/companies">Companies</NavLink>
                <NavLink exact to="/jobs">Jobs</NavLink>
                <NavLink exact to="/profile">Profile</NavLink>
                <NavLink exact to="/">Logout</NavLink>
            </>
        )
    }

    const publicNav = () => {
        return (
            <>
                <NavLink exact to="/login" className="NavLink">Login</NavLink>
                <NavLink exact to="/register">Register</NavLink>
            </>
        )
    }
    return (
        <div className="NavBar">
            <NavLink exact to="/">Search</NavLink>
            <NavLink exact to="/browse">Browse</NavLink>
            {/* {publicNav() } */}
        </div>
    )
}

export default NavBar;