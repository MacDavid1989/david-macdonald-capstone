import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// imported functions
import { mealType as randomMealType } from '../../utils/randomMealType';
import { randomLetter as randomQuery } from '../../utils/randomLetter';
import { newIngredient as getIngredient } from '../../utils/newIngredient'
import { newMeal as getMeal } from '../../utils/newMeal'
// imported components
import RecipeModal from '../../components/RecipeModal'
import AddToModal from '../../components/AddToModal'
// imported icons
import plus from '../../assets/icons/plus-green.svg'
import leftArrow from '../../assets/icons/long-arrow-left.svg'
import rightArrow from '../../assets/icons/long-arrow-right.svg'
// styling
import '../../scss/Browse.scss';

const SERV_URL = process.env.REACT_APP_LOCAL_HOST || 'http://localhost:5000';

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
        // then calls getAPIMeals function after state is changed
        if(sessionStorage.getItem('query')&&sessionStorage.getItem('mealType')){
            this.setState({
                query: sessionStorage.getItem('query'),
                mealType: sessionStorage.getItem('mealType'),
                from: parseInt(sessionStorage.getItem('from')),
                to: parseInt(sessionStorage.getItem('to')),
                page: parseInt(sessionStorage.getItem('page')),
            }, this.getAPIMeals)
        } else {
        // if there is no data in session storage then the getAPIMeals function will be called to fetch random meals
            this.getAPIMeals()
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
    getAPIMeals = () => {
        // variables obtained from the process.env object
        const API_URL = process.env.REACT_APP_API_URL;
        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;

        // values set based on state or a random value generate from functions to provide queries for the GET request
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
        }, this.getAPIMeals)   
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
        }, this.getAPIMeals)
    }

    // onClick handler for the next page arrow
    handleNext = () => {
        this.setState({
            meals: '',
            from: this.state.from + 24,
            to: this.state.to + 24,
            page: this.state.page + 1
        }, this.getAPIMeals)
    }

    // onClick handler for the previous page arrow; does nothing when on page 1 
    handlePrevious = () => {
        (this.state.from > 0)&&
        this.setState({
            meals: '',
            from: this.state.from - 24,
            to: this.state.to - 24,
            page: this.state.page - 1
        }, this.getAPIMeals)
    }

    // onClick handler for adding a meal to the server, calls getIngredients to create an ingredients object
    // with a new unique id, week value, and mealId. Only if an ingredients object is created will the POST
    // request be made to the server with a meal object returned from the getMeal function. Upon successful POST
    // a POST request is then made to the groceries route to add the ingredients to the list 
    handleAdd = (meal, id, date, week) => {
        console.log(meal, id)
        const ingredients = meal.ingredients.map(ingredient => {
            return  getIngredient(ingredient,week,id)
        })
        
        ingredients&&
        axios.post(`${SERV_URL}/meals`, getMeal(meal, ingredients, week, id, date))
        .then(()=>{
            axios.post(`${SERV_URL}/groceries`, { plan: true })
            .then()
            .catch()
        })
        .catch(console.error)
    }

    // onClick handler to render Recipe Modal by changing the src state value with the url of the recipe
    showIframe = (src) => {
        this.setState({
            src: src
        })
    }

    // onCLick handler resets the src value upon closing the modal so as to remain undisplayed
    resetSrc = () => {
        this.setState({
            src: ''
        })
    }

    // onClick handler passes the meal and id to the AddTo modal and sets display so as to change the display condition
    // from none to flex
    showAddTo = (meal, id) => {
        this.setState({
            display: true,
            selectedMeal: meal,
            selectedMealId: id
        })
    }
    
    // onCLick handler resets the values needed to render and display the AddTo modal
    resetDisplay = () => {
        this.setState({
            display: false,
            selectedMeal: '',
            selectedMealId: ''
        })
    }
    
    // Browse recipes component
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
                                value={this.state.query} 
                                onChange={this.changeSearchIngredient}
                            />
                            <select 
                                className="search__form-select" 
                                name='mealType' 
                                value={this.state.mealType} 
                                onChange={this.changeMealType}
                            >
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
            {this.state.meals&&this.state.meals.map(meal => {const id = uuidv4(); 
                return  <li key={id} className="meal">
                            <img 
                                className="meal__image" 
                                onClick={()=>this.showIframe(meal.url)} 
                                src={meal.image} 
                                alt={meal.label}
                            />
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
                    {/* Page navigation for previous and next cards */}
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