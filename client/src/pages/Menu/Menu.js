import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getWeek } from 'date-fns';
// imported data
import { days as daysOfTheWeek } from '../../utils/daysOfTheWeek';
// imported component
import RecipeModal from '../../components/RecipeModal';
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg';
import rightArrow from '../../assets/icons/short-arrow-right.svg';
import longRightArrow from '../../assets/icons/long-arrow-right.svg';
import plus from '../../assets/icons/plus-green.svg';
import removeIcon from '../../assets/icons/remove-plus.svg';
// styling
import '../../scss/Menu.scss';

const SERV_URL = process.env.REACT_APP_LOCAL_HOST || 'http://localhost:5000';

// Weekly menu component
function Menu () {
    // state keys: myMeals are the user selected meals from the meals route, display to src are 
    // used to render Recipe modal, week by default is the current week,
    // and remove sets that display of the remove button 
    const [myMeals, setMyMeals] = useState('');
    const [src, setSrc] = useState('');
    const [week, setWeek] = useState(getWeek(new Date()));
    const [remove, setRemove] = useState(true);

    useEffect(()=> {
        // upon mounting makes GET request to server for meals and sets state upon successful response
        axios.get(`${SERV_URL}/meals`)
        .then(res => setMyMeals(res.data))
        .catch();
    }, []);

    useEffect(()=>{
        // if moving to the current week then gives the ability to delete meals
        week===(getWeek(new Date()))&&setRemove(true);
  
        // if moving to a previous week then removes the delete meals button
        (week===(getWeek(new Date())-1)||(getWeek(new Date())===1&&week===52))&&setRemove(false);
    }, [week]);

    // onClick handler to make a DELETE request with the id of the selected meal, then on successful response, 
    // makes a GET request to render the new meals and update the grocery items to have the removed 
    // ingredients removed from the list 
    const handleRemove = (id) => {
        axios.delete(`${SERV_URL}/meals/${id}`)
        .then(()=>{
            axios.get(`${SERV_URL}/meals`)
            .then(res => setMyMeals(res.data))
            .catch(console.error);
        })
        .catch(console.error);
    };

    // onClick handler to render Recipe Modal by changing the src state value with the url of the recipe
    const showIframe = (src) => {
        setSrc(src);
    };

    // onCLick handler resets the src value upon closing the modal so as to remain undisplayed
    const resetSrc = () => {
        setSrc('');
    };

    // onClick handler for the previous week arrow which decrements by 1 or sets it to 52
    // if its the previous year 
    const handlePrevious = () => {
        week===1?setWeek(52):setWeek(week - 1);
    };

    // onClick handler for the next week arrow which increments the week by one or
    // sets it to 1 if it's the new year
    const handleNext = () => {
        week===52?setWeek(1):setWeek(week + 1);
    };

    // Menu component
    return (
        <div className="menu">
            {/* Banner section denoted by turquoise background */}
            <section className="menu__banner">
                <h1 className="menu__banner-title">
                    Menu
                </h1>
                <h2 className="menu__banner-subtitle">
                    Your weekly meal plan
                </h2>
                <div className="menu__container">
                    <img 
                        className="menu__arrow" 
                        onClick={handlePrevious} 
                        src={leftArrow} 
                        alt="left arrow"
                    />
                    <span className="menu__week">
                        {week===getWeek(new Date())?`Current Week`:`Week ${week}`}
                    </span>
                    <img 
                        className="menu__arrow" 
                        onClick={handleNext} 
                        src={rightArrow} 
                        alt="right arrow"
                    />
                </div>
            </section>
            {/* List of meals generated for each week by mapping an array of the days of the week then 
            mapping the meals that match the day */}
            <ul className="menu__list">
    {myMeals&&daysOfTheWeek.map((day, i) => {
            return <Fragment key={i}>
                    <h3 className="menu__date">{day}</h3>
                {myMeals&&myMeals.map(meal => meal.date===day&&meal.week===week&&
                    <li key={meal.id} className="card">
                        <img 
                            className="card__image" 
                            onClick={()=>showIframe(meal.url)} 
                            src={meal.image} 
                            alt={`${meal.name}`}
                        />
                        <span className="card__name" onClick={()=>showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        <img 
                            className="card__arrow" 
                            onClick={()=>showIframe(meal.url)} 
                            src={longRightArrow} 
                            alt="right arrow"
                        />
                        <span 
                            className="card__remove" 
                            style={{ display: remove ? "flex" : "none" }} 
                            onClick={()=>handleRemove(meal.id)}
                        >
                            <img className="card__remove-icon" src={removeIcon} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: remove ? "flex" : "none" }} to="/browse">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                </Fragment>
    })}   
            </ul>
            {/* Recipe Modal */}
            <RecipeModal resetSrc={resetSrc} src={src}/>
        </div>
    );
};

export default Menu;