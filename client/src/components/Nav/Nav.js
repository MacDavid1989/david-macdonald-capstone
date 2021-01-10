import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// imported icons
import logo from '../../assets/icons/grubbery.svg';
// styling
import '../../scss/Nav.scss';

function Nav() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="nav">
                <div className="nav__container">
                    <NavLink 
                        className={open ? "nav__logo-alt" : "nav__logo"} 
                        to="/" 
                        onClick={() => open&&setOpen(!open)}
                    >
                        <img src={logo} alt="grubbery logo"/>
                    </NavLink>
                    <div className={open ? "nav__burger-alt" : "nav__burger"} onClick={() => setOpen(!open)}>
                        <div className="nav__burger-line"></div>
                        <div className="nav__burger-line"></div>
                        <div className="nav__burger-line"></div>
                    </div>
                    <div className={open ? "nav__links-alt" : "nav__links"}>
                        <NavLink className="nav__links-text" to="/browse" onClick={() => setOpen(!open)}>
                            Browse Recipes
                        </NavLink>
                        <NavLink className="nav__links-text" to="/menu" onClick={() => setOpen(!open)}>
                            Menu
                        </NavLink>
                        <NavLink className="nav__links-text" to="/grocery" onClick={() => setOpen(!open)}>
                            Grocery List
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;