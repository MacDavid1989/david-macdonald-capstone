import React, { Component, Fragment } from 'react';
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
class AddToModal extends Component {
    // state keys: display determines if the modal is rendered, week to id are values for creating the meal object
    // previous determines if the previous arrow is shown, toast determines if the ToastModal is rendered, day is
    // the value sent to the ToastModal for the message
    state = {
        display: false,
        week: getWeek(new Date()),
        meal: '',
        id: '',
        previous: false,
        toast: false,
        day: ''
    }

    // onClick handler to close modal by calling the resetDisplay function and setting display state
    closeAddTo = () => {
        this.props.resetDisplay();
        this.setState({
            display: false,
        });
    };

    componentDidUpdate(_prevP, prevS) {
        // when the sate is updated after mount sets the display to true to keep modal rendered and passes props value to state values
        (prevS.display === false) && this.props.display &&
        this.setState({
            display: true,
            meal: this.props.meal,
            id: this.props.id
        });

        // as the weeks update keeps the modal displayed
        prevS.week !== this.state.week &&
        this.setState({
            display: true,
        });

        // if moving to a week less than the current week then removes the ability to delete meals
        prevS.week===(getWeek(new Date())+1)&&this.state.week===(getWeek(new Date()))&&
        this.setState({
            previous: false
        })

        // if moving from a week less than the current week then gives the ability to delete meals
        prevS.week===getWeek(new Date())&&this.state.week===(getWeek(new Date())+1)&&
        this.setState({
            previous: true
        })
        
        // if moving from the first week of the year to the last week then removes the delete meals button
        prevS.week===1&&this.state.week===getWeek(new Date())&&
        this.setState({
            previous: false
        })

        // if moving from the last week of the year to the new year then shows the delete meals if the current week is the 1st week
        prevS.week===getWeek(new Date())&&this.state.week===1&&
        this.setState({
            previous: true
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

    // function to reset the ToastModal on close
    resetToast = () => {
        this.setState({
            toast: false
        })
    }

    render() {
        return (
            <>
                <div className="addTo" style={{ display: this.state.display ? "flex" : "none" }}>
                    <div className="addTo__frame">
                        <img onClick={this.closeAddTo} className="addTo__remove" src={remove} alt="x"/>
                        <h3 className="addTo__title">
                            Add to Menu
                        </h3>
                        <span className="addTo__subtitle">
                            Select the week and day you would like to add the meal
                        </span>
                        {/* Week selector */}
                        <div className="addTo__container">
                            <img 
                                style={{ visibility: this.state.previous ? "initial" : "hidden" }} 
                                className="addTo__arrow" 
                                onClick={this.handlePrevious} 
                                src={leftArrow} 
                                alt="left arrow"
                            />
                            <span className="addTo__week">
                                {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                            </span>
                            <img className="addTo__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                        </div>
                        {/* Days of the week to add meals mapped from the days array */}
                    {daysOfTheWeek.map( (day, i) =>
                        <Fragment key={i}>
                            <div className="addTo__date">
                                <span className="addTo__date-title">{day}</span>
                                <span 
                                    onClick={()=> {
                                        this.props.addToDate(this.state.meal, this.state.id, day, this.state.week); 
                                        this.props.resetDisplay(); 
                                        this.setState({toast: true, day: day}); 
                                        this.closeAddTo()
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
                    toast={this.state.toast} 
                    resetToast={this.resetToast} 
                    day={this.state.day} 
                    week={this.state.week}
                    />
            </>
        );
    }
}

export default AddToModal;