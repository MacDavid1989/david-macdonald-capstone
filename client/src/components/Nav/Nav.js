import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/icons/grubbery.svg'
import '../../scss/Nav.scss';

function Nav() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <nav className="nav">
                <div className="nav__container">
                    <NavLink className="nav__logo" to="/">
                        <img src={logo} alt="grubbery logo"/>
                    </NavLink>
                    <div className={open ? "nav__burger-alt" : "nav__burger"} onClick={() => {setOpen(!open);  console.log(open)}}>
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