import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Nav.scss';
import logo from '../../assets/icons/grubbery.svg'

function Nav() {

    return (
        <>
            <nav className="nav">
                <div className="nav__container">
                    <NavLink className="nav__logo" to="/">
                        <img src={logo} alt="grubbery logo"/>
                    </NavLink>
                    <div className="nav__links">
                        <NavLink className="nav__links-text" to="/browse">Browse Recipes</NavLink>
                        <NavLink className="nav__links-text" to="/menu">Menu</NavLink>
                        <NavLink className="nav__links-text" to="/grocery">Grocery List</NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;