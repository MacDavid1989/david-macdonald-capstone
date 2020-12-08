import React, { Component } from 'react';
import '../../scss/Home.scss';
import axios from 'axios';
import select from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove.svg'
import close from '../../assets/icons/close.svg'
import { meals } from '../../utils/tempData'
import { weightConversion } from '../../utils/weightConversion'
import { v4 as uuidv4 } from 'uuid';

class MyMeals extends Component {
     // state for meal search and select page
     state = {
        myMeals: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/meals`)
        .then(res => {
            this.setState({
                myMeals: res.data
            });
            
        }).catch()
    }

    // makes delete request to remove meal from my meals
    handleRemove = (id) => {
        axios.delete(`http://localhost:8080/meals/${id}`)
        .then()
        .catch(console.error)
    }

    render() {
        return (
            <div>
                <h1>My Meals</h1>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    <li key={meal.id} className="mealCard">
                        <img className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
                        <img className="mealCard-image" src={meal.image} alt={`${meal.name}`}/>
                        <div className="mealCard-details">
                            <span>
                                {meal.name}
                            </span>
                            <span>
                                {`${meal.calories} cals`}
                            </span>
                        </div>
                    </li>
                    )}
                </ul>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}

export default MyMeals;