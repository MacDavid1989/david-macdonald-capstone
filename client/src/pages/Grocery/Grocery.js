import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeek } from 'date-fns'
// imported functions
import { weightConversion } from '../../utils/weightConversion'
import { newUserItem } from '../../utils/newUserItem'
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import removeIcon from '../../assets/icons/remove-plus.svg'
import check from '../../assets/icons/check.svg'
// styling
import '../../scss/Grocery.scss';

// server url
const SERV_URL = process.env.REACT_APP_LOCAL_HOST || 'http://localhost:5000';

function Grocery(props) {
    // state key: groceries holds the list of grocery items from the grocery route, week by default 
    // holds the current value of the current week display determines whether the form to add an 
    // item will be viewable, and remove determines is the delete button is viewable 
    const [ groceries, setGroceries] = useState('')
    const [ week, setWeek] = useState(getWeek(new Date()))
    const [ remove, setRemove] = useState(true)

    // makes the GET request to the grocery route with the current week to fetch the items that match the week id
    // the response is then sorted based on if they are completed or not upon rendering.
     const getGroceries = () => {
        axios.get(`${SERV_URL}/groceries/${week}`)
        .then(res => setGroceries(res.data.sort((x, y) => (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1)))
        .catch(console.error)
    }

    // calls getGroceries after mounting
    useEffect(()=>{
        getGroceries()
    })

    // performs callback every time week changes on render
    useEffect(()=>{
        // if moving to a week less than the current week then removes the ability to delete meals
        week===(getWeek(new Date())-1)&&setRemove(false)

        // if moving from a week less than the current week then gives the ability to delete meals
        week===(getWeek(new Date()))&&setRemove(true)
  
        // if moving from the first week of the year to the last week then removes the delete meals button
        getWeek(new Date())===1&&week===52&&setRemove(false)
    }, [week])

    // onClick handler to make a DELETE request based on the id of the item then renders the new grocery list upon successful response
    const handleRemoveGrocery = (id) => {
        axios.delete(`${SERV_URL}/groceries/${id}`)
        .then(()=>getGroceries())
        .catch()
    } 

    // onSubmit handler which posts a new user grocery item to the server and upon a successful response makes a new GET request
    const handleAddGrocery = (e) => {
        e.preventDefault()
        console.log(newUserItem(e,week))
        axios.post(`${SERV_URL}/groceries`, newUserItem(e, week))
        .then(() => {
            getGroceries()
        })
        .catch()
        e.target.reset()
    } 

    // onClick handler for the previous week arrow which decrements by 1 or sets it to 52
    // if its the previous year 
    const handlePrevious = () => {
        if(week===1){
            setWeek(52);
        } else {
            setWeek(week - 1);
        }
    }

    // onClick handler for the next week arrow which increments the week by one or
    // sets it to 1 if it's the new year
    const handleNext = () => {
        if(week===52){
            setWeek(1);
        } else {
            setWeek(week + 1);
        }
    }

    //onClick handler that updates the isCompleted value of the item based on id and makes a new GET request at a successful response
    const crossOffItem = (id) => {
        axios.put(`${SERV_URL}/groceries/${id}`)
        .then(() => {
            getGroceries()
        })
        .catch()
    }

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
                    <img className="grocery__arrow" onClick={handlePrevious} src={leftArrow} alt="left arrow"/>
                    <span className="grocery__week">
                        {week===getWeek(new Date())?`Current Week`:`Week ${week}`}
                    </span>
                    <img className="grocery__arrow" onClick={handleNext} src={rightArrow} alt="right arrow"/>
                </div>
            </header>
            {/* User items list section */}
            <section className="grocery__user">
                <h2 className="grocery__user-title">
                    Your Items
                </h2 >
                {/* Add item form */}
                <form className="grocery__user-form" style={{ display: remove ? "flex" : "none" }} onSubmit={handleAddGrocery}>
                    <button className="grocery__user-add" type="submit">
                            <img className="grocery__user-icon" src={plus} alt="plus sign"/>
                    </button>
                    <input className="grocery__user-item" required type="text" pattern="[A-Za-z -]{3,}" name="itemName" placeholder="Add item"/>
                    <input className="grocery__user-weight" required type="number" name="itemWeight" placeholder="Weight (g)"/>
                </form>
                {/* User added grocery list */}
                <ul className="grocery__list">
                {groceries&&groceries.map(grocery => grocery.category==="user item"&&grocery.week===week&&
                    <li key={grocery.id} className="item" style={{ display: "flex"}}>
                        <span onClick={()=>crossOffItem(grocery.id)} className={grocery.isCompleted?"item__select-check":"item__select"}>
                            <img className="item__select-icon" src={grocery.isCompleted?check:undefined} alt=""/>
                        </span>
                        <span className="item__name" style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                            {`${grocery.food.toLowerCase()}`}
                        </span>
                        <span className={remove?"item__weight--alt":"item__weight"}>
                            {`${weightConversion(grocery.weight)}`}
                        </span>
                        <img 
                            className="item__remove" 
                            style={{ display: remove ? "flex" : "none" }} 
                            onClick={()=>handleRemoveGrocery(grocery.id)} 
                            src={removeIcon} 
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
                {groceries&&groceries.map(grocery =>
                    grocery.category!=="user item"&&grocery.week===week&&
                    <li key={grocery.id} className="item" style={{ display: "flex"}}>
                        <span onClick={()=>crossOffItem(grocery.id)} className={grocery.isCompleted?"item__select-check":"item__select"}>
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

export default Grocery;