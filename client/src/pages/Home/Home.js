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
                    <div className="summary">
                        <div>
                            <img alt="browsing through meals"/>
                            <h3>Browse</h3>
                        </div>
                        <div>
                            <img alt="planning weekly meals"/>
                            <h3>Plan</h3>
                        </div>
                    </div>
                    <div className="summary">
                        <div>
                            <img alt="grocery shopping"/>
                            <h3>Shop</h3>
                        </div>
                        <div>
                            <img alt="cooking meals"/>
                            <h3>Cook</h3>
                        </div>
                    </div>
                </div>
                <Link to="/search">
                    <button className="home__button">Browse Meals</button>
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Plan Your Meals in Minutes</h1>
                <img className="home__card-image" alt="meal plan snapshot"/>
                <Link to="/search">
                    <button className="home__button">Begin Planning</button>
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">Grocery List Simplified</h1>
                <img className="home__card-image" alt="grocery list snapshot"/>
                <Link to="/search">
                    <button className="home__button">Save Time</button>
                </Link>
            </div>
            <div className="home__card">
                <h1 className="home__card-title">What Are You Waiting For?</h1>
                <img className="home__card-image" alt="recipe snapshot"/>
                <Link to="/search">
                    <button className="home__button">Start Cooking</button>
                </Link>
            </div>
        </div>
    );
    
}

export default Home;