import React from 'react';
import { Link } from 'react-router-dom';
// imported icons
import logo from '../../assets/icons/grubbery-white.svg';
// styling
import '../../scss/Footer.scss';

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <Link className="footer__logo" to="/">
                        <img src={logo} alt="grubbery logo"/>
                    </Link>
                    <div className="footer__links">
                        <Link className="footer__links-text" to="/browse">
                            Browse Recipes
                        </Link>
                        <Link className="footer__links-text" to="/menu">
                            Menu
                        </Link>
                        <Link className="footer__links-text" to="/grocery">
                            Grocery List
                        </Link>
                    </div>
                    <div id="edamam-badge" data-color="white"></div>
                </div>
            </footer>
        </>
    );
};

export default Footer;