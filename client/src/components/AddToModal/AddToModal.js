import React, { Component } from 'react';
import { getWeek } from 'date-fns';
import '../../scss/AddToModal.scss';
import ToastModal from '../ToastModal'
import unchecked from '../../assets/icons/checkbox-unchecked.svg';
import checked from '../../assets/icons/checkbox-checked.svg'
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import longRightArrow from '../../assets/icons/long-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'
import check from '../../assets/icons/check.svg'

class RecipeModal extends Component {
    state = {
        display: false,
        week: getWeek(new Date()),
        meal: '',
        id: '',
        previous: false,
        toast: false,
        day: ''
    }

    closeAddTo = () => {
        this.props.resetDisplay();
        this.setState({
            display: false,
        });
    };

    componentDidUpdate(_prevP, prevS) {
        (prevS.display === false) && this.props.display &&
        this.setState({
            display: true,
            meal: this.props.meal,
            id: this.props.id
        });

        prevS.week !== this.state.week &&
        this.setState({
            display: true,
        });

        prevS.week===(getWeek(new Date())+1)&&this.state.week===(getWeek(new Date()))&&
        this.setState({
            previous: false
        })

        prevS.week===getWeek(new Date())&&this.state.week===(getWeek(new Date())+1)&&
        this.setState({
            previous: true
        })
        
        prevS.week===1&&this.state.week===getWeek(new Date())&&
        this.setState({
            previous: false
        })

        prevS.week===getWeek(new Date())&&this.state.week===1&&
        this.setState({
            previous: true
        })

    }

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
                    <h3 className="addTo__title">Add to Menu</h3>
                    <span className="addTo__subtitle">Select the week and day you would like to add the meal</span>
                    <div className="addTo__container">
                        <img style={{ visibility: this.state.previous ? "initial" : "hidden" }} className="addTo__arrow" onClick={this.handlePrevious} src={leftArrow} alt="left arrow"/>
                        <span className="addTo__week">
                            {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                        </span>
                        <img className="addTo__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Sunday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Sunday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Sunday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Monday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Monday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Monday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Tuesday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Tuesday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Tuesday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Wednesday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Wednesday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Wednesday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Thursday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Thursday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Thursday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Friday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Friday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Friday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                    <div className="addTo__date">
                        <span className="addTo__date-title">Saturday</span>
                        <span onClick={()=> {this.props.addToDate(this.state.meal, this.state.id, 'Saturday', this.state.week); this.props.resetDisplay(); this.setState({toast: true, day: 'Saturday'}); this.closeAddTo()}} className="addTo__select">
                            <img className="addTo__select-icon" src={plus} alt="plus sign"/>
                        </span>
                    </div>
                </div>
            </div>
            <ToastModal toast={this.state.toast} resetToast={this.resetToast} meal={this.state.meal.label} day={this.state.day} week={this.state.week}/>
            </>
        );
    }
}

export default RecipeModal;