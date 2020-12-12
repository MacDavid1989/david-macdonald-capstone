import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Home.scss';

function Home() {

    return (
        <div className="home">
            <div className="hero">
                <h1 className="hero__title">
                    Meet your favorite time saver
                </h1>
                <img className="hero__image" alt="mobile snapshot of search page"/>
            </div>
            <div className="summary">
                <h2 className="summary__title">Meal planning & grocery shopping has never been easier</h2>
                <div className="summary__container">
                        <div className="summary__browse">
                            <img className="summary__browse-image" alt="browsing through meals"/>
                            <h3 className="summary__browse-title">Browse</h3>
                        </div>
                        <div className="summary__plan">
                            <img className="summary__plan-image" alt="planning weekly meals"/>
                            <h3 className="summary__plan-title">Plan</h3>
                        </div>
                        <div className="summary__shop">
                            <img className="summary__shop-image" alt="grocery shopping"/>
                            <h3 className="summary__shop-title">Shop</h3>
                        </div>
                </div>
                <Link className="home__link" to="/search">
                    <span className="home__link-text">Browse Meals</span>
                    <img className="home__link-icon" alt="arrow right"/>
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Plan Your Meals in Minutes</h1>
                <img className="home__card-image" alt="meal plan snapshot"/>
                <Link className="home__link" to="/search">
                    <span className="home__link-text">Browse Meals</span>
                    <img className="home__link-icon" alt="arrow right"/>
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Grocery List Simplified</h1>
                <img className="home__card-image--alt" alt="grocery list snapshot"/>
                <Link className="home__link" to="/search">
                    <span className="home__link-text">Browse Meals</span>
                    <img className="home__link-icon" alt="arrow right"/>
                </Link>
            </div>
        </div>
    );
    
}

export default Home;