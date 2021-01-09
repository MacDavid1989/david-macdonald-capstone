import React, { Fragment, useState, useEffect } from 'react';
import { getWeek } from 'date-fns';
// imported component
import ToastModal from '../ToastModal'
// imported functions
import { days as daysOfTheWeek } from '../../utils/daysOfTheWeek'
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'
// styling
import '../../scss/AddToModal.scss';

// AddToModal component
function AddToModal (props) {
    // state keys: display determines if the modal is rendered, week to id are values for creating the meal object
    // previous determines if the previous arrow is shown, toast determines if the ToastModal is rendered, day is
    // the value sent to the ToastModal for the message
    const [ display, setDisplay] = useState(false)
    const [ week, setWeek] = useState(getWeek(new Date()))
    const [ meal, setMeal] = useState('')
    const [ id, setId] = useState('')
    const [ previous, setPrevious] = useState(false)
    const [ toast, setToast] = useState(false)
    const [ day, setDay] = useState('')

    // onClick handler to close modal by calling the resetDisplay function and setting display state
    const closeAddTo = () => {
        props.resetDisplay();
        setDisplay(false)
    };

    useEffect(()=>{
        // only on first mount sets display state to true and sets Meal and Id the respective props values
        display===false&&props.display&&
        setDisplay(true)
        setMeal(props.meal)
        setId(props.id)
    
        // if moving to a week greater than the current week add the ability to go to a previous week
        week===(getWeek(new Date())+1)&&setPrevious(true)

        // if it is the current week then remove ability to go to a previous week
        week===(getWeek(new Date()))&&setPrevious(false)

        // if the next week is the new year then add the ability to go back to a previous week
        getWeek(new Date())===52&&week===1&&setPrevious(true)

    }, [week, display, props.display, props.meal, props.id])

    // onClick handler for the previous week arrow which decrements by 1 or sets it to 52
    // if its the previous year 
    const handlePrevious = () => {
        week===1&&setWeek(52)&&setDisplay(true)
        week!==1&&setWeek(week - 1)&&setDisplay(true)
    }

    // onClick handler for the next week arrow which increments the week by one or
    // sets it to 1 if it's the new year
    const handleNext = () => {
        week===52&&setWeek(1)&&setDisplay(true)
        week!==52&&setWeek(week + 1)&&setDisplay(true)
    }

    // function to reset the ToastModal on close
    const resetToast = () => {
        setToast(false)
    }

    return (
        <>
            <div className="addTo" style={{ display: display ? "flex" : "none" }}>
                <div className="addTo__frame">
                    <img onClick={closeAddTo} 
                        className="addTo__remove" 
                        src={remove} 
                        alt="x"
                    />
                    <h3 className="addTo__title">
                        Add to Menu
                    </h3>
                    <span className="addTo__subtitle">
                        Select the week and day you would like to add the meal
                    </span>
                    {/* Week selector */}
                    <div className="addTo__container">
                        <img 
                            style={{ visibility: previous ? "initial" : "hidden" }} 
                            className="addTo__arrow" 
                            onClick={handlePrevious} 
                            src={leftArrow} 
                            alt="left arrow"
                        />
                        <span className="addTo__week">
                            {week===getWeek(new Date())?`Current Week`:`Week ${week}`}
                        </span>
                        <img className="addTo__arrow" 
                            onClick={handleNext} 
                            src={rightArrow} 
                            alt="right arrow"
                        />
                    </div>
                    {/* Days of the week to add meals mapped from the days array */}
                {daysOfTheWeek.map( (day, i) =>
                    <Fragment key={i}>
                        <div className="addTo__date">
                            <span className="addTo__date-title">{day}</span>
                            <span 
                                onClick={()=> {
                                    props.addToDate(meal, id, day, week); 
                                    props.resetDisplay(); 
                                    setToast(true);
                                    setDay(day); 
                                    closeAddTo();
                                }} 
                                className="addTo__select"
                            >
                                <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                            </span>
                        </div>
                    </Fragment> 
                )}
                </div>
            </div>
            <ToastModal 
                toast={toast} 
                resetToast={resetToast} 
                day={day} 
                week={week}
            />
        </>
    );
}

export default AddToModal;