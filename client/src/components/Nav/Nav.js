import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/icons/grubbery.svg'
import '../../scss/Nav.scss';

function Nav() {

    return (
        <>
            <nav className="nav">
                <div className="nav__container">
                    <NavLink className="nav__logo" to="/">
                        <img src={logo} alt="grubbery logo"/>
                    </NavLink>
                    <div className="nav__burger">
                        <div>

                        </div>
                        <div>
                            
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="nav__links">
                        <NavLink className="nav__links-text" to="/browse">
                            Browse Recipes
                        </NavLink>
                        <NavLink className="nav__links-text" to="/menu">
                            Menu
                        </NavLink>
                        <NavLink className="nav__links-text" to="/grocery">
                            Grocery List
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;