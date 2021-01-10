import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// imported functions
import { mealType as randomMealType } from '../../utils/randomMealType';
import { randomLetter as randomQuery } from '../../utils/randomLetter';
import { newIngredient as getIngredient } from '../../utils/newIngredient';
import { newMeal as getMeal } from '../../utils/newMeal';
// imported components
import RecipeModal from '../../components/RecipeModal';
import AddToModal from '../../components/AddToModal';
// imported icons
import plus from '../../assets/icons/plus-green.svg';
import leftArrow from '../../assets/icons/long-arrow-left.svg';
import rightArrow from '../../assets/icons/long-arrow-right.svg';
// styling
import '../../scss/Browse.scss';

const SERV_URL = process.env.REACT_APP_LOCAL_HOST || 'http://localhost:5000';

// Browse Recipes component
function Browse () {
    // state keys: query to page are search related, display is for the Recipe Modal state, previous is for rendering the back arrow,
    // src to selectedMealId is data to be passed as props to the Recipe Modal.
    const [query, setQuery] = useState(sessionStorage.getItem('query') || '');
    const [mealType, setMealType] = useState(sessionStorage.getItem('mealType') || '');
    const [meals, setMeals] = useState('');
    const [from, setFrom] = useState(parseInt(sessionStorage.getItem('from')) || 0);
    const [to, setTo] = useState(parseInt(sessionStorage.getItem('to')) || 24);
    const [page, setPage] = useState(parseInt(sessionStorage.getItem('page')) || 1);
    const [display, setDisplay] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [src, setSrc] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedMealId, setSelectedMealId] = useState('');

    // makes a GET request to the API in order to fetch meals
    const getAPIMeals = () => {
        // variables obtained from the process.env object
        const API_URL = process.env.REACT_APP_API_URL;
        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;

        // values set based on state or a random value generate from functions to provide queries for the GET request
        const MEAL = `&mealType=${mealType || randomMealType()}&from=${from}&to=${to}`;
        const QUERY = query || randomQuery();

        // conditional request that only occurs when the specified values have data
        QUERY&&MEAL&&!meals&&
        axios.get(API_URL+QUERY+API_ID+API_KEY+MEAL)
        .then(response => setMeals(response.data.hits.map(meal => meal.recipe)))
        .catch(console.error);
    };

    useEffect(()=>{
        // if there is no data in session storage then the getAPIMeals function will be called to fetch random meals
        getAPIMeals();

        // sets session storage when a search value is entered into the field
        return ()=> {
            if(query&&mealType){
                sessionStorage.setItem('query', query);
                sessionStorage.setItem('mealType', mealType);
                sessionStorage.setItem('from', from);
                sessionStorage.setItem('to', to);
                sessionStorage.setItem('page', page);
            };
        };
    });

    // onChange handler for the search input 
    const changeSearchIngredient = (e) => {
        setMeals('');
        setFrom(0);
        setTo(24);
        setPage(1);
        setPrevious(false);
        setQuery(e.target.value.toLowerCase());
        getAPIMeals();
    };

    // onChange handler for the select input
    const changeMealType = (e) => {
        setMeals('');
        setFrom(0);
        setTo(24);
        setPage(1);
        setPrevious(false);
        setMealType(e.target.value);
        getAPIMeals();
    };

    // onClick handler for the next page arrow
    const handleNext = () => {
        setMeals('');
        setFrom(from + 24);
        setTo(to + 24);
        setPage(page + 1);
        setPrevious(true);
        getAPIMeals();
    };

    // onClick handler for the previous page arrow; does nothing when on page 1 
    const handlePrevious = () => {
        (from - 24)===0&&setPrevious(false);
        
        if(from!==0){
            setMeals('');
            setFrom(from - 24);
            setTo(to - 24);
            setPage(page - 1);
            getAPIMeals();
        };
    };

    // onClick handler for adding a meal to the server, calls getIngredients to create an ingredients object
    // with a new unique id, week value, and mealId. Only if an ingredients object is created will the POST
    // request be made to the server with a meal object returned from the getMeal function. Upon successful POST
    // a POST request is then made to the groceries route to add the ingredients to the list 
    const handleAdd = (meal, id, date, week) => {
        const ingredients = meal.ingredients.map(ingredient => {
            return  getIngredient(ingredient,week,id);
        });
        
        ingredients&&
        axios.post(`${SERV_URL}/meals`, getMeal(meal, ingredients, week, id, date))
        .then(()=>{
            axios.post(`${SERV_URL}/groceries`, { plan: true })
            .then()
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

    // onClick handler passes the meal and id to the AddTo modal and sets display so as to change the display condition
    // from none to flex
    const showAddTo = (meal, id) => {
        setDisplay(true);
        setSelectedMeal(meal);
        setSelectedMealId(id);
    };
    
    // onCLick handler resets the values needed to render and display the AddTo modal
    const resetDisplay = () => {
        setDisplay(false);
        setSelectedMeal('');
        setSelectedMealId('');
    };
    
    // Browse recipes component
    return (
        <>
            <RecipeModal resetSrc={resetSrc} src={src}/>
            <AddToModal 
                displayAddTo={display} 
                mealAddTo={selectedMeal}
                idAddTo={selectedMealId}
                addToDate={handleAdd} 
                resetDisplay={resetDisplay}
            />
            <div className="search">
                {/* Banner denoted by turquoise background */}
                <section className="search__banner">
                    <h1 className="search__banner-title">
                        Browse Recipes
                    </h1>
                    <h2 className="search__banner-subtitle">
                        Search over 1.5 million delicious recipes
                    </h2>
                    {/*  Search and Select inputs for browsing recipe data */}
                    <form className="search__form">
                        <input 
                            className="search__form-input" 
                            type='text' name='searchIngredient' 
                            placeholder="Search Recipes" 
                            value={query} 
                            onChange={changeSearchIngredient}
                        />
                        <select 
                            className="search__form-select" 
                            name='mealType' 
                            value={mealType} 
                            onChange={changeMealType}
                        >
                            <option className="search__form-option" value="">
                                Select meal
                            </option>
                            <option className="search__form-option" value="breakfast">
                                Breakfast
                            </option>
                            <option className="search__form-option" value="lunch">
                                Lunch
                            </option>
                            <option className="search__form-option" value="dinner">
                                Dinner
                            </option>
                            <option className="search__form-option" value="snack">
                                Snack
                            </option>
                        </select>
                    </form>
                </section>
                {/* Recipe cards rendered utilizing map of the data received from the API */}
                <ul className="search__list">
        {meals&&meals.map(meal => {const id = uuidv4(); 
            return  <li key={id} className="meal">
                        <img 
                            className="meal__image" 
                            onClick={()=>showIframe(meal.url)} 
                            src={meal.image} 
                            alt={meal.label}
                        />
                        <div className="meal__details">
                            <span className="meal__name">
                                {meal.label}
                            </span>
                            <span className="meal__select" onClick={()=>showAddTo(meal, id)}>
                                <img className="meal__select-icon" src={plus} alt="plus sign"/>
                            </span>
                        </div>
                    </li>
        })}
                </ul>
                {/* Page navigation for previous and next cards */}
                <div className="search__button">
                    <span className="search__button-arrow" onClick={handlePrevious}>
                        <img 
                            style={{ visibility: previous ? "visible" : "hidden" }}  
                            className="search__button-arrow__icon"
                            src={leftArrow} 
                            alt="left arrow"
                        />
                    </span>
                    <span className="search__button-page">
                        {page}
                    </span>
                    <span className="search__button-arrow" onClick={handleNext}>
                        <img className="search__button-arrow__icon" src={rightArrow} alt="right arrow"/>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Browse;