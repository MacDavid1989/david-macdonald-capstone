import React, { Component } from 'react';
import axios from 'axios';
import RecipeModal from '../../components/RecipeModal'
import remove from '../../assets/icons/remove.svg'
import '../../scss/Home.scss';

class MyMeals extends Component {
     // state for meal search and select page
     state = {
        myMeals: '',
        display: false,
        src: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/meals`)
        .then(res => {
            this.setState({
                myMeals: res.data
            });
        }).catch()
    }

    componentDidUpdate() {
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

    // post meal list to server
    handleSave = () => {
        // post saved list to server goes here
    }

    //opens the modal
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

    render() {
        return (
            <div>
                <h1>My Meals</h1>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    <li key={meal.id} className="mealCard">
                        <img className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
                        <img className="mealCard-image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
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
                {/* Modal */}
                <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
            </div>
        );
    }
}

export default MyMeals;