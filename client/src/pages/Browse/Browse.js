import React, { Component } from 'react';
import '../../scss/Browse.scss';
import axios from 'axios';
import select from '../../assets/icons/add.svg'
import { v4 as uuidv4 } from 'uuid';
import RecipeModal from '../../components/RecipeModal'
import AddToModal from '../../components/AddToModal'
import { mealType as randomMealType } from '../../utils/randomMealType';
import { randomLetter as randomQuery } from '../../utils/randomLetter';
import plus from '../../assets/icons/plus-green.svg'
import leftArrow from '../../assets/icons/long-arrow-left.svg'
import rightArrow from '../../assets/icons/long-arrow-right.svg'

// Browse Recipes component
class Browse extends Component {
    // state keys: query to page are search related, display is for the Recipe Modal state, previous is for rendering the back arrow,
    // src to selectedMealId is data to be passed as props to the Recipe Modal.
    state = {
        query: '',
        mealType: '',
        meals: '',
        from: 0,
        to: 24,
        page: 1,
        display: false,
        previous: false,
        src: '',
        selectedMeal: '',
        selectedMealId: ''
    }


    componentDidMount() {
        // Upon mounting, checks if there is data stored in session storage and sets state to those values
        // then calls getMeals function after state is changed
        if(sessionStorage.getItem('query')&&sessionStorage.getItem('mealType')){
            this.setState({
                query: sessionStorage.getItem('query'),
                mealType: sessionStorage.getItem('mealType'),
                from: parseInt(sessionStorage.getItem('from')),
                to: parseInt(sessionStorage.getItem('to')),
                page: parseInt(sessionStorage.getItem('page')),
            }, this.getMeals)
        } else {
        // if there is no data in session storage then the getMeals function will be called to fetch random meals
            this.getMeals()
        }    
    }

    componentDidUpdate(_prevP, prevS) {
        // checks if the page transitioned from the second group of meals to the first and hides the previous button
        prevS.from===24&&this.state.from===0&&
        this.setState({
            previous: false
        })

        // checks if the page transitioned from the first group of meals to the second and shows the previous button
        prevS.from===0&&this.state.from===24&&
        this.setState({
            previous: true
        })

        // shows the previous arrow when the page loads from session storage data on any page other than 1
        !this.state.previous&&this.state.from!==0&&
        this.setState({
            previous: true
        })
    }

    componentWillUnmount() {
        // sets session storage when a search value is entered into the field and the page will be unmounted
        if(this.state.query){
            sessionStorage.setItem('query', this.state.query);
            sessionStorage.setItem('mealType', this.state.mealType);
            sessionStorage.setItem('from', this.state.from);
            sessionStorage.setItem('to', this.state.to);
            sessionStorage.setItem('page', this.state.page);
        }
    }

    // makes a GET request to the API in order to fetch meals
    getMeals = () => {
        // variables obtained from the process.env object
        const API_URL = process.env.REACT_APP_API_URL;
        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;

        // values set based on state or a random value generate from data files to provide queries for the GET request
        const MEAL = `&mealType=${this.state.mealType || randomMealType()}&from=${this.state.from}&to=${this.state.to}`;
        const QUERY = this.state.query || randomQuery();

        // conditional request that only occurs when the specified values have data
        QUERY&&MEAL&&!this.state.meals&&
        axios.get(API_URL+QUERY+API_ID+API_KEY+MEAL)
        .then(response => {
            this.setState({
                meals: response.data.hits.map(meal => meal.recipe)
            })
        }) 
    }

    // onChange handler for the search input 
    changeSearchIngredient = (e) => {
        this.setState({
            meals: '',
            from: 0,
            to: 24,
            page: 1,
            previous: false,
            query: e.target.value.toLowerCase()
        }, this.getMeals)   
    }

    // onChange handler for the select input
    changeMealType = (e) => {
        this.setState({
            meals: '',
            from: 0,
            to: 24,
            page: 1,
            previous: false,
            mealType: e.target.value
        }, this.getMeals)
    }

    // onClick handler for the next page arrow
    handleNext = () => {
        this.setState({
            meals: '',
            from: this.state.from + 24,
            to: this.state.to + 24,
            page: this.state.page + 1
        }, this.getMeals)
    }

    // onClick handler for the previous page arrow; does nothing when on page 1 
    handlePrevious = () => {
        (this.state.from > 0)&&
        this.setState({
            meals: '',
            from: this.state.from - 24,
            to: this.state.to - 24,
            page: this.state.page - 1
        }, this.getMeals)
    }


    handleAdd = (meal, id, date, week) => {
        const ingredients = meal.ingredients.map(ingredient => {
           const newIngredient = {
                id: uuidv4(),
                week: week,
                mealId: id,
                quantity: ingredient.quantity,
                measure: ingredient.measure,
                food: ingredient.food,
                foodId: ingredient.foodId,
                weight: ingredient.weight,
                category: ingredient.foodCategory,
                image: ingredient.image,
                isCompleted: false
            }

            return newIngredient
        })
        axios.post(`http://localhost:8080/meals`, {
            id: id,
            date: date,
            week: week,
            calories: Math.ceil(meal.calories / meal.yield),
            name: meal.label,
            image: meal.image,
            url: meal.url,
            ingredients: ingredients
        }).then(()=>{
            axios.post(`http://localhost:8080/groceries`, { plan: true })
            .then()
            .catch()
        })
        .catch(console.error)
    }

    showIframe = (src) => {
        this.setState({
            src: src
        })
    }

    resetSrc = () => {
        this.setState({
            src: ''
        })
    }

    showAddTo = (meal, id) => {
        this.setState({
            display: true,
            selectedMeal: meal,
            selectedMealId: id
        })
    }
    
    resetDisplay = () => {
        this.setState({
            display: false,
            selectedMeal: '',
            selectedMealId: ''
        })
    }
    
    render() {
        return (
            <>
                <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
                <AddToModal 
                    display={this.state.display} 
                    meal={this.state.selectedMeal}
                    id={this.state.selectedMealId}
                    addToDate={this.handleAdd} 
                    resetDisplay={this.resetDisplay}
                />
                <div className="search">
                    <div className="search__banner">
                        <h1 className="search__banner-title">
                            Browse Recipes
                        </h1>
                        <h2 className="search__banner-subtitle">
                            Search over 1.5 million delicious recipes
                        </h2>
                        <form className="search__form">
                            <input 
                                className="search__form-input" 
                                type='text' name='searchIngredient' 
                                placeholder="Search Recipes" 
                                value={this.state.query} 
                                onChange={this.changeSearchIngredient}
                            />
                            <select className="search__form-select" name='mealType' value={this.state.mealType} onChange={this.changeMealType}>
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
                    </div>
                    <ul className="search__list">
            {this.state.meals&&this.state.meals.map(meal => {const id = uuidv4(); 
                return  <li key={id} className="meal">
                            <img className="meal__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={meal.label}/>
                            <div className="meal__details">
                                <span className="meal__name">
                                    {meal.label}
                                </span>
                                <span className="meal__select" onClick={()=>this.showAddTo(meal, id)}>
                                    <img className="meal__select-icon" src={plus} alt="plus sign"/>
                                </span>
                            </div>
                        </li>
            })}
                    </ul>
                    <div className="search__button">
                        <span className="search__button-arrow" onClick={this.handlePrevious}>
                            <img 
                                style={{ visibility: this.state.previous ? "visible" : "hidden" }}  
                                className="search__button-arrow__icon"
                                src={leftArrow} 
                                alt="left arrow"
                            />
                        </span>
                        <span className="search__button-page">
                            {this.state.page}
                        </span>
                        <span className="search__button-arrow" onClick={this.handleNext}>
                            <img className="search__button-arrow__icon" src={rightArrow} alt="right arrow"/>
                        </span>
                    </div>
                </div>
            </>
        );
    }
}

export default Browse;