import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getWeek } from 'date-fns'
// imported data
import { days as daysOfTheWeek } from '../../utils/daysOfTheWeek'
// imported component
import RecipeModal from '../../components/RecipeModal'
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import longRightArrow from '../../assets/icons/long-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'
// styling
import '../../scss/Menu.scss';

// Weekly menu component
class Menu extends Component {
     // state keys: myMeals are the user selected meals from the meals route, display to src are used to render Recipe modal, week by default is the current week,
     // and remove sets that display of the remove button 
     state = {
        myMeals: '',
        display: false,
        src: '',
        week: getWeek(new Date()),
        remove: true
    }

    componentDidMount() {
        // upon mounting makes GET request to server for meals and sets state upon successful response
        axios.get(`http://localhost:8080/meals`)
        .then(res => {
            this.setState({
                myMeals: res.data
            });
        }).catch()
    }

    componentDidUpdate(_prevP, prevS) {
        // if moving to a week less than the current week then removes the ability to delete meals
        prevS.week===getWeek(new Date())&&this.state.week===(getWeek(new Date())-1)&&
        this.setState({
            remove: false
        })

        // if moving from a week less than the current week then gives the ability to delete meals
        prevS.week===(getWeek(new Date())-1)&&this.state.week===(getWeek(new Date()))&&
        this.setState({
            remove: true
        })
        
        // if moving from the first week of the year to the last week then removes the delete meals button
        prevS.week===getWeek(new Date())&&getWeek(new Date())===1&&this.state.week===52&&
        this.setState({
            remove: false
        })

        // if moving from the last week of the year to the new year then shows the delete meals if the current week is the 1st week
        prevS.week===52&&this.state.week===getWeek(new Date())&&getWeek(new Date())===1&&
        this.setState({
            remove: true
        })
    }

    // onClick handler to make a DELETE request with the id of the selected meal, then on successful response, makes a GET
    // request to render the new meals and update the grocery items to have the removed ingredients removed from the list 
    handleRemove = (id) => {
        axios.delete(`http://localhost:8080/meals/${id}`)
        .then(()=>{
            axios.get(`http://localhost:8080/meals`)
            .then(res => {
                this.setState({
                    myMeals: res.data
                });
                axios.post(`http://localhost:8080/groceries`, { plan: true })
                .then()
                .catch()
            }).catch()
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

    // onClick handler for the previous week arrow which decrements by 1 or sets it to 52
    // if its the previous year 
    handlePrevious = () => {
        if(this.state.week===1){
            this.setState({
                week: 52,
                display: true
            })
        } else {
            this.setState({
                week: this.state.week - 1,
                display: true
            })
        }
    }

    // onClick handler for the next week arrow which increments the week by one or
    // sets it to 1 if it's the new year
    handleNext = () => {
        if(this.state.week===52){
            this.setState({
                week: 1,
                display: true
            })
        } else {
            this.setState({
                week: this.state.week + 1,
                display: true
            })
        }
    }

    // Menu component
    render() {
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
                        <img className="menu__arrow" onClick={this.handlePrevious} src={leftArrow} alt="left arrow"/>
                        <span className="menu__week">
                            {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                        </span>
                        <img className="menu__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                    </div>
                </section>
                {/* List of meals generated for each week by mapping an array of the days of the week then mapping the meals that match the day */}
                <ul className="menu__list">
        {this.state.myMeals&&daysOfTheWeek.map((day, i) => {
             return <Fragment key={i}>
                        <h3 className="menu__date">{day}</h3>
                    {this.state.myMeals&&this.state.myMeals.map(meal => meal.date===day&&meal.week===this.state.week&&
                        <li key={meal.id} className="card">
                            <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                            <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                                {meal.name}
                            </span>
                            <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                            <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                                <img className="card__remove-icon" src={remove} alt="plus sign"/>
                            </span>
                        </li>
                    )}
                        <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/browse">
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
                <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
            </div>
        );
    }
}

export default Menu;