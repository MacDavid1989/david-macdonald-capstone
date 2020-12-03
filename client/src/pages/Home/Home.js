import React, { Component } from 'react';
import '../../scss/Home.scss';
import axios from 'axios';

// https://api.edamam.com/search?q=${query}+${YOUR_APP_ID}+${YOUR_APP_KEY}
const API_URL = process.env.REACT_APP_API_URL;
const API_ID = process.env.REACT_APP_API_ID;
const API_KEY = process.env.REACT_APP_API_KEY;

class home extends Component {
    state = {
        query: '',
        mealType: ''
    }

    componentDidMount() {
        this.setState({
            query: '',
            mealType: ''
        })
    }

    handleMealSearch = (e) => {
        this.setState({
            query: e.target.query.value,
            mealType: e.target.mealType.value
        })
        axios.get(API_URL+this.state.query+API_ID+API_KEY+this.state.mealType)
    }

    changeSearchIngredient = (e) => {
        this.setState({
            query: e.target.value,
        }, ()=>console.log(this.state.query))
    }

    changeMealType = (e) => {
        this.setState({
            mealType: e.target.value
        }, ()=>console.log(this.state.mealType))
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
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    </select>
                </form>
            </div>
        );
    }
}

export default home;