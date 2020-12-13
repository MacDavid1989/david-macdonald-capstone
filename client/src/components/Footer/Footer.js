import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Footer.scss';
import logo from '../../assets/icons/grubbery-white.svg'

function Footer() {

    return (
        <>
            <div className="footer">
                    <NavLink className="footer__logo" to="/"><img src={logo} alt="grubbery logo"/></NavLink>
                <div className="footer__links">
                    <NavLink className="footer__links-text" to="/search">Browse Recipes</NavLink>
                    <NavLink className="footer__links-text--alt" to="/my meals">Menu</NavLink>
                    <NavLink className="footer__links-text" to="/grocery list">Grocery List</NavLink>
                </div>
            </div>
        </>
    );
}


export default Footer;