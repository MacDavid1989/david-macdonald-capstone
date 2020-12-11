import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getWeek } from 'date-fns'
import axios from 'axios';
import RecipeModal from '../../components/RecipeModal'
import remove from '../../assets/icons/remove.svg'
import '../../scss/MyMeals.scss';

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
            <div>
                <h1>My Meals</h1>
                <button onClick={this.handlePrevious}>previous</button>
                <h1>{this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}</h1>
                <button onClick={this.handleNext}>next</button>
                <h2>Sunday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Sunday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Monday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Monday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Tuesday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Tuesday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Wednesday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Wednesday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Thursday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Thursday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Friday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Friday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                <h2>Saturday</h2>
                <ul className="mealList">
                    {this.state.myMeals&&this.state.myMeals.map(meal =>
                    meal.date==='Saturday'&&meal.week===this.state.week&&
                    <li key={meal.id} className="mealCard">
                        <img style={{ display: this.state.remove ? "flex" : "none" }} className="mealCard-select" onClick={()=>this.handleRemove(meal.id)} src={remove} alt="minus symbol"/>
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
                <Link style={{ display: this.state.remove ? "flex" : "none" }} to="/search">Add another meal</Link>
                {/* Modal */}
                <RecipeModal resetSrc={this.resetSrc} src={this.state.src}/>
            </div>
        );
    }
}

export default MyMeals;