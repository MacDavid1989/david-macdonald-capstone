import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Nav.scss';
function Nav() {

    return (
        <>
            <div className="nav">
                    <NavLink className="nav__logo" to="/">Logo</NavLink>
                <div className="nav__links">
                    <NavLink className="nav__links-text" to="/search">Browse Recipes</NavLink>
                    <NavLink className="nav__links-text--alt" to="/my meals">Menu</NavLink>
                    <NavLink className="nav__links-text" to="/grocery list">Grocery List</NavLink>
                </div>
            </div>
            <div className="spacer">
            </div>
        </>
    );
}


export default Nav;