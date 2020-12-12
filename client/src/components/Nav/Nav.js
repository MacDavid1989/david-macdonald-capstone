import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Nav.scss';
import logo from '../../assets/icons/grubbery.svg'
function Nav() {

    return (
        <>
            <div className="nav">
                    <NavLink className="nav__logo" to="/"><img src={logo} alt="grubbery logo"/></NavLink>
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