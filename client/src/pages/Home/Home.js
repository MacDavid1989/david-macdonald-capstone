import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Home.scss';

function Home() {

    return (
        <>
            <div>
                <h1>
                    Meet Your Favorite Timesaver
                </h1>
                <img/>
            </div>
            <div>
                <h2>Weekly Meal Planning Made Easy</h2>
                <div>
                    <div>
                        <div>
                            <img/>
                            <h3>Browse</h3>
                        </div>
                        <div>
                            <img/>
                            <h3>Plan</h3>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img/>
                            <h3>Shop</h3>
                        </div>
                        <div>
                            <img/>
                            <h3>Cook</h3>
                        </div>
                    </div>
                </div>
                <Link to="/search">
                    <button>Browse Meals</button>
                </Link>
            </div>
            <div>
                <h1>Plan Your Meals in Minutes</h1>
                <img/>
                <Link to="/search">
                    <button>Begin Planning</button>
                </Link>
            </div>
            <div>
                <h1>Grocery List Simplified</h1>
                <img/>
                <Link to="/search">
                    <button>Save Time</button>
                </Link>
            </div>
            <div>
                <h1>What Are You Waiting For?</h1>
                <img/>
                <Link to="/search">
                    <button>Start Cooking</button>
                </Link>
            </div>
        </>
    );
    
}

export default Home;