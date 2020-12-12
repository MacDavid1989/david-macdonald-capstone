import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Home.scss';

function Home() {

    return (
        <div className="home">
            <div className="hero">
                <h1 className="hero__title">
                    Meet Your Favorite Timesaver
                </h1>
                <img className="hero__image" alt="mobile snapshot of search page"/>
            </div>
            <div className="summary">
                <h2 className="summary__title">Weekly Meal Planning Made Easy</h2>
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
                    Browse Meals
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Plan Your Meals in Minutes</h1>
                <img className="home__card-image" alt="meal plan snapshot"/>
                <Link className="home__link" to="/search">
                    Browse Meals
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Grocery List Simplified</h1>
                <img className="home__card-image--alt" alt="grocery list snapshot"/>
                <Link className="home__link" to="/search">
                    Browse Meals
                </Link>
            </div>
        </div>
    );
    
}

export default Home;