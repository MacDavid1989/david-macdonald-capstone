import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Nav.scss';
function Nav() {

    return (
        <>
            <div className="nav">
                <div className="nav__logo">
                    <NavLink to="/">Logo</NavLink>
                </div>
                <div className="nav__links">
                    <NavLink to="/search">Meal Search</NavLink>
                    <NavLink to="/my meals">Meal Plan</NavLink>
                    <NavLink to="/grocery list">Grocery List</NavLink>
                </div>
            </div>
            <div className="spacer">
            </div>
        </>
    );
}


export default Nav;