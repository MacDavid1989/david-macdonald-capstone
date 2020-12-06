import React, { Component } from 'react';
import '../../scss/Home.scss';
import axios from 'axios';
import select from '../../assets/icons/add.svg'
import { meals } from '../../utils/tempData'

// https://api.edamam.com/search?q=${query}+${YOUR_APP_ID}+${YOUR_APP_KEY}


class home extends Component {
    // state for meal search and select page
    state = {
        query: '',
        mealType: '',
        meals: meals.hits.map(meal => meal.recipe),
        from: 0
    }

    // request to get meals from api based on search
    getMeals = () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const MEAL = `&mealType=${this.state.mealType}&from=${this.state.from}`;
        const QUERY = this.state.query;

        this.state.query&&this.state.mealType&&!this.state.meals&&
        axios.get(API_URL+QUERY+API_ID+API_KEY+MEAL)
        .then(response => {
            console.log(response)
            this.setState({
                meals: response.data.hits.map(meal => meal.recipe)
            })
            console.log(this.state.meals)
        }) 
    }

    // onChange handler for search input
    changeSearchIngredient = (e) => {
        this.setState({
            query: e.target.value.toLowerCase(),
        }, this.getMeals)   
    }

    // onChange handler for select input
    changeMealType = (e) => {
        this.setState({
            mealType: e.target.value
        }, this.getMeals)
    }

    // resets meals forcing new request for the next 10 meals in the search
    handleNext = () => {
        this.setState({
            meals: '',
            from: this.state.from + 10
        }, this.getMeals)
    }

    // resets meals forcing new request for the previous 10 meals in the search
    handlePrevious = () => {
        (this.state.from > 0)&&
        this.setState({
            meals: '',
            from: this.state.from - 10
        }, this.getMeals)
    }

    // post to server with the meal wanting to be added
    handleAdd = (meal) => {
        console.log(meal)
        const ingredients = meal.ingredients.map(ingredient => {
           const newIngredient = {
                quantity: ingredient.quantity,
                measure: ingredient.measure,
                food: ingredient.food,
                weight: ingredient.weight
            }

            return newIngredient
        })
        axios.post(`http://localhost:8080/meals`, {
            calories: Math.ceil(meal.calories / meal.yield),
            name: meal.label,
            image: meal.image,
            url: meal.url,
            ingredients: ingredients
        }).then(res => {
            console.log(res.data)
        }).catch(console.error)
    }

    render() {
        return (
            <div>
                {/* search for meal component */}
                <h1>
                    Welcome! Search for your meal!
                </h1>
                <form>
                    <input type='search' name='searchIngredient' value={this.state.query} onChange={this.changeSearchIngredient}/>
                    <select name='mealType' value={this.state.mealType} onChange={this.changeMealType}>
                    <option defaultValue value="default" hidden>
                      Please select a meal:
                    </option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    </select>
                </form>
                {/* select meal component */}
                <h1>
                    Select your meal!
                </h1>
                <ul className="mealList">
                    {this.state.meals&&this.state.meals.map(meal =>
                    <li className="mealCard">
                        <img className="mealCard-select" onClick={()=>this.handleAdd(meal)} src={select}/>
                        <img className="mealCard-image" src={meal.image}/>
                        <div className="mealCard-details">
                            <span>
                                {meal.label}
                            </span>
                            <span>
                                {`${Math.ceil(meal.calories / meal.yield)} cals`}
                            </span>
                        </div>
                    </li>
                    )}
                </ul>
                <button onClick={this.handlePrevious}>PREVIOUS</button>
                <button onClick={this.handleNext}>NEXT</button>
                {/* mymeals component */}
            </div>
        );
    }
}

export default home;