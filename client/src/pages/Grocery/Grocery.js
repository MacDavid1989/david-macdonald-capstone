import React, { Component } from 'react';
import axios from 'axios';
import { getWeek } from 'date-fns'
// imported functions
import { weightConversion } from '../../utils/weightConversion'
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'
import check from '../../assets/icons/check.svg'
// styling
import '../../scss/Grocery.scss';

class Grocery extends Component {
    // state key: groceries holds the list of grocery items from the grocery route, week by default holds the current value of the current week
    // display determines whether the form to add an item will be viewable, and remove determines is the delete button is viewable 
    state = {
        groceries: '',
        week: getWeek(new Date()),
        display: false,
        remove: true,

    }

    getGroceries = () => {
        axios.get(`http://localhost:8080/groceries/${this.state.week}`)
        .then(res => {
            this.setState({
                groceries: res.data.sort((x, y) => {
                    return (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1;
                })
            })
        })
        .catch(console.error)
    }

    componentDidMount() {
        // makes the GET request to the grocery route with the current week to fetch the items that match the week id
        // the response is then sorted based on if they are completed or not upon rendering.
       this.getGroceries()
    }

    componentDidUpdate(_prevP, prevS) {
        // checks to see if the week value has changed and then makes a get request for the groceries based on the week id
        prevS.week!==this.state.week&&
        this.getGroceries()

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

    // onClick handler to make a DELETE request based on the id of the item then renders the new grocery list upon successful response
    handleRemoveGrocery = (id) => {
        axios.delete(`http://localhost:8080/groceries/${id}`)
        .then(()=>{
            this.getGroceries()
        })
        .catch()
    }

    // onSubmit handler which posts a new user grocery item to the server and upon a successful response makes a new GET request
    handleAddGrocery = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/groceries`, { 
            food: e.target.itemName.value,
            weight: parseInt(e.target.itemWeight.value),
            week: this.state.week,
            isCompleted: false 
        })
        .then(() => {
            this.getGroceries()
        })
        .catch()
        e.target.reset()
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

    //onClick handler that updates the isCompleted value of the item based on id and makes a new GET request at a successful response
    crossOffItem = (id) => {
        axios.put(`http://localhost:8080/groceries/${id}`)
        .then(() => {
            this.getGroceries()
        })
        .catch()
    }

    render() {
        return (
            <div className="grocery">
                {/* Banner section denoted by the turquoise background */}
                <header className="grocery__banner">
                    <h1 className="grocery__banner-title">
                        Grocery List
                    </h1>
                    <h2 className="grocery__banner-subtitle">
                        Buy precisely what you need
                    </h2>
                    <div className="grocery__container">
                        <img className="grocery__arrow" onClick={this.handlePrevious} src={leftArrow} alt="left arrow"/>
                        <span className="grocery__week">
                            {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                        </span>
                        <img className="grocery__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                    </div>
                </header>
                {/* User items list section */}
                <section className="grocery__user">
                    <h2 className="grocery__user-title">
                        Your Items
                    </h2 >
                    {/* Add item form */}
                    <form className="grocery__user-form" style={{ display: this.state.remove ? "flex" : "none" }} onSubmit={this.handleAddGrocery}>
                        <button className="grocery__user-add" type="submit">
                                <img className="grocery__user-icon" src={plus} alt="plus sign"/>
                        </button>
                        <input className="grocery__user-item" required type="text" pattern="[A-Za-z -]{3,}" name="itemName" placeholder="Add item"/>
                        <input className="grocery__user-weight" required type="number" name="itemWeight" placeholder="Weight (g)"/>
                    </form>
                    {/* User added grocery list */}
                    <ul className="grocery__list">
                    {this.state.groceries&&this.state.groceries.map(grocery => grocery.category==="user item"&&grocery.week===this.state.week&&
                        <li key={grocery.id} className="item" style={{ display: "flex"}}>
                            <span onClick={()=>this.crossOffItem(grocery.id)} className={grocery.isCompleted?"item__select-check":"item__select"}>
                                <img className="item__select-icon" src={grocery.isCompleted?check:undefined} alt=""/>
                            </span>
                            <span className="item__name" style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                                {`${grocery.food.toLowerCase()}`}
                            </span>
                            <span className={this.state.remove?"item__weight--alt":"item__weight"}>
                                {`${weightConversion(grocery.weight)}`}
                            </span>
                            <img 
                                className="item__remove" 
                                style={{ display: this.state.remove ? "flex" : "none" }} 
                                onClick={()=>this.handleRemoveGrocery(grocery.id)} 
                                src={remove} 
                                alt="minus symbol"
                            />
                        </li>
                    )}
                    </ul>
                </section>
                {/* Recipe items list section */}
                <section className="grocery__recipe">
                    <h2 className="grocery__recipe-title">
                        Recipe Items
                    </h2>
                    {/* Recipe ingredients grocery list */}
                    <ul className="grocery__list">
                    {this.state.groceries&&this.state.groceries.map(grocery =>
                        grocery.category!=="user item"&&grocery.week===this.state.week&&
                        <li key={grocery.id} className="item" style={{ display: "flex"}}>
                            <span onClick={()=>this.crossOffItem(grocery.id)} className={grocery.isCompleted?"item__select-check":"item__select"}>
                                <img className="item__select-icon"  src={grocery.isCompleted?check:undefined} alt=""/>
                            </span>
                            <span className="item__name" style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                                {`${grocery.food.toLowerCase()}`}
                            </span>
                            <span className="item__weight">
                                {`${weightConversion(grocery.weight)}`}
                            </span>
                        </li>
                        )}
                    </ul>
                </section>
            </div>
        );
    }
}

export default Grocery;