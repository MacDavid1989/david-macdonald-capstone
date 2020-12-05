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
    }

    changeSearchIngredient = (e) => {
        this.setState({
            query: e.target.value.toLowerCase(),
        }, ()=>console.log(this.state.query))
    }

    changeMealType = (e) => {
        this.setState({
            mealType: e.target.value
        }, ()=>console.log(this.state.mealType))
    }

    componentDidUpdate() {
        this.state.query&&this.state.mealType&&
            console.log(API_URL+this.state.query+API_ID+API_KEY+this.state.mealType)


        axios.get(API_URL+this.state.query+API_ID+API_KEY+this.state.mealType)
        .then(response => {
            console.log(response)
            // this.setState({
            //     query: '',
            //     mealType: ''
            // })
        }) 
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
            </div>
        );
    }
}

export default home;