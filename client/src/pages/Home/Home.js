import React, { Component } from 'react';
import '../../scss/Home.scss';
import axios from 'axios';

// https://api.edamam.com/search?q=${query}+${YOUR_APP_ID}+${YOUR_APP_KEY}


class home extends Component {
    state = {
        query: '',
        mealType: '',
        meals: '',
        from: 0
    }

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

    changeSearchIngredient = (e) => {
        this.setState({
            query: e.target.value.toLowerCase(),
        }, this.getMeals)   
    }

    changeMealType = (e) => {
        this.setState({
            mealType: e.target.value
        }, this.getMeals)
    }

    handleNext = () => {
        this.setState({
            meals: '',
            from: this.state.from + 10
        }, this.getMeals)
    }

    handlePrevious = () => {
        (this.state.from > 0)&&
        this.setState({
            meals: '',
            from: this.state.from - 10
        }, this.getMeals)
    }

    render() {
        return (
            <div>
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
                <h1>
                    Select your meal!
                </h1>
                <ul>
                    {this.state.meals&&this.state.meals.map(meal =>
                    <li>
                        <div>
                            <img src={meal.image}/>
                            <div>
                                <span>
                                    {meal.label}
                                </span>
                                <span>
                                    {`${Math.ceil(meal.calories / meal.yield)} cals`}
                                </span>
                            </div>
                        </div>
                    </li>
                    )}
                </ul>
                <button onClick={this.handlePrevious}>PREVIOUS</button>
                <button onClick={this.handleNext}>NEXT</button>
            </div>
        );
    }
}

export default home;