import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Home.scss';
import arrow from '../../assets/icons/long-arrow-right-white.svg';

function Home() {

    return (
        <>
            <div className="home">
                <div className="hero">
                    <div className="hero__container">
                        <h1 className="hero__title">
                            Meet Your Favorite Time Saver
                        </h1>
                        <img className="hero__image" alt="mobile snapshot of search page"/>
                    </div>
                </div>
                <div className="summary">
                    <h2 className="summary__title">Meal planning and grocery shopping has never been easier.</h2>
                    <div className="summary__container">
                            <div className="summary__topic">
                                <img className="summary__topic-image" alt="browsing through meals"/>
                                <h3 className="summary__topic-title">Browse</h3>
                            </div>
                            <div className="summary__topic">
                                <img className="summary__topic-image" alt="planning weekly meals"/>
                                <h3 className="summary__topic-title">Plan</h3>
                            </div>
                            <div className="summary__topic">
                                <img className="summary__topic-image" alt="grocery shopping"/>
                                <h3 className="summary__topic-title">Shop</h3>
                            </div>
                    </div>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">Begin Planning</span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </div>
                <div className="home__card--alt">
                    <h1 className="home__card-title">Plan your meals for the week in just minutes.</h1>
                    <img className="home__card-image--alt" alt="meal plan snapshot"/>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">Browse Recipes</span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </div>
                <div className="home__card">
                    <h1 className="home__card-title">What are you waiting for - Save time, eat well.</h1>
                    <img className="home__card-image" alt="grocery list snapshot"/>
                    <Link className="home__link" to="/browse">
                        <span className="home__link-text">Start Cooking</span>
                        <img className="home__link-icon" src={arrow} alt="arrow right"/>
                    </Link>
                </div>
            </div>
        </>
    );  
}

export default Home;