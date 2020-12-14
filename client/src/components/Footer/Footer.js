import React from 'react';
import { Link } from 'react-router-dom'
import '../../scss/Footer.scss';
import logo from '../../assets/icons/grubbery-white.svg'

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <Link className="footer__logo" to="/">
                        <img src={logo} alt="grubbery logo"/>
                    </Link>
                    <div className="footer__links">
                        <Link className="footer__links-text" to="/search">Browse Recipes</Link>
                        <Link className="footer__links-text" to="/my meals">Menu</Link>
                        <Link className="footer__links-text" to="/grocery list">Grocery List</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}


export default Footer;