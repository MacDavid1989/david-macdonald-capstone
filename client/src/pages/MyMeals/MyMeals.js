import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getWeek } from 'date-fns'
import axios from 'axios';
import RecipeModal from '../../components/RecipeModal'
import '../../scss/MyMeals.scss';
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import longRightArrow from '../../assets/icons/long-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'

class MyMeals extends Component {
     // state for meal search and select page
     state = {
        myMeals: '',
        display: false,
        src: '',
        week: getWeek(new Date()),
        remove: true
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/meals`)
        .then(res => {
            this.setState({
                myMeals: res.data
            });
        }).catch()
    }

    componentDidUpdate(_prevP, prevS) {
        prevS.week===getWeek(new Date())&&this.state.week===(getWeek(new Date())-1)&&
        this.setState({
            remove: false
        })

        prevS.week===(getWeek(new Date())-1)&&this.state.week===(getWeek(new Date()))&&
        this.setState({
            remove: true
        })
        
        prevS.week===getWeek(new Date())&&this.state.week===52&&
        this.setState({
            remove: false
        })

        prevS.week===52&&this.state.week===getWeek(new Date())&&
        this.setState({
            remove: true
        })
    }

    // makes delete request to remove meal from my meals
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

    render() {
        return (
            <div className="menu">
                <div className="menu__banner">
                    <h1 className="menu__banner-title">Menu</h1>
                    <h2 className="menu__banner-subtitle">Your weekly meal planner</h2>
                    <div className="menu__container">
                        <img className="menu__arrow" onClick={this.handlePrevious} src={leftArrow} alt="left arrow"/>
                        <span className="menu__week">
                            {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                        </span>
                        <img className="menu__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                    </div>
                </div>
                <ul className="menu__list">
                    <h3 className="menu__date">Sunday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Sunday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Monday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Monday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Tuesday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Tuesday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Wednesday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Wednesday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Thursday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Thursday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Friday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Friday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                    <h3 className="menu__date">Saturday</h3>
                {this.state.myMeals&&this.state.myMeals.map(meal =>
                meal.date==='Saturday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="card">
                        <img className="card__image" onClick={()=>this.showIframe(meal.url)} src={meal.image} alt={`${meal.name}`}/>
                        <span className="card__name" onClick={()=>this.showIframe(meal.url)}>
                            {meal.name}
                        </span>
                        {/* <span >
                            {`${meal.calories} cals`}
                        </span> */}
                        <img className="card__arrow" onClick={()=>this.showIframe(meal.url)} src={longRightArrow} alt="right arrow"/>
                        <span className="card__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemove(meal.id)}>
                            <img className="card__remove-icon" src={remove} alt="plus sign"/>
                        </span>
                    </li>
                )}
                    <Link className="menu__link" style={{ display: this.state.remove ? "flex" : "none" }} to="/search">
                        <span className="menu__link-add">
                            <img className="menu__link-icon" src={plus} alt="plus sign"/>
                        </span>
                        <span className="menu__link-text">
                            Add another meal
                        </span>
                    </Link>
                </ul>
                {/* Modal */}
                <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
            </div>
        );
    }
}

export default MyMeals;