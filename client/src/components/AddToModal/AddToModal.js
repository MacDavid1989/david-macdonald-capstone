import React, { Fragment, useState, useEffect } from 'react';
import { getWeek } from 'date-fns';
// imported components
import ToastModal from '../ToastModal';
// imported functions
import { days as daysOfTheWeek } from '../../utils/daysOfTheWeek';
// imported icons
import leftArrow from '../../assets/icons/short-arrow-left.svg';
import rightArrow from '../../assets/icons/short-arrow-right.svg';
import plus from '../../assets/icons/plus-green.svg';
import remove from '../../assets/icons/remove-plus.svg';
// styling
import '../../scss/AddToModal.scss';

// AddToModal component
function AddToModal ({ displayAddTo , mealAddTo, idAddTo, addToDate, resetDisplay }) {
    // state keys: display determines if the modal is rendered, week to id are values for creating the meal object
    // previous determines if the previous arrow is shown, toast determines if the ToastModal is rendered, day is
    // the value sent to the ToastModal for the message
    const [ display, setDisplay] = useState(false);
    const [ week, setWeek] = useState(getWeek(new Date()));
    const [ meal, setMeal] = useState('');
    const [ id, setId] = useState('');
    const [ previous, setPrevious] = useState(false);
    const [ toast, setToast] = useState(false);
    const [ day, setDay] = useState('');

    useEffect(()=>{
        // sets display state to true and sets Meal and Id the respective props values
        !display&&displayAddTo&&setDisplay(true);
        setMeal(mealAddTo);
        setId(idAddTo);
        
        // if moving to a week greater than the current week add the ability to go to a previous week
        // if it is the current week then remove ability to go to a previous week
        week===(getWeek(new Date()))?setPrevious(false):setPrevious(true);
        
    }, [week, display, displayAddTo, mealAddTo, idAddTo]);
    
    // onClick handler for the previous week arrow which decrements by 1 or sets it to 52
    // if its the previous year 
    const handlePrevious = () => {
        week===1?setWeek(52):setWeek(week - 1);
    };
    
    // onClick handler for the next week arrow which increments the week by one or
    // sets it to 1 if it's the new year
    const handleNext = () => {
        week===52?setWeek(1):setWeek(week + 1);
    };
    
    // onClick handler to close modal by calling the resetDisplay function and setting display state
    const closeAddTo = () => {
        resetDisplay();
        setDisplay(false);
    };
    
    // function to reset the ToastModal on close
    const resetToast = () => {
        setToast(false);
    };

    return (
        <>
            <div className="addTo" style={{ display: display ? "flex" : "none" }}>
                <div className="addTo__frame">
                    <img 
                        onClick={closeAddTo} 
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
                        <img 
                            className="addTo__arrow" 
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
                                    addToDate(meal, id, day, week); 
                                    resetDisplay(); 
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