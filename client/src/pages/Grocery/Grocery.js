import React, { Component } from 'react';
import axios from 'axios';
import { getWeek } from 'date-fns'
import { weightConversion } from '../../utils/weightConversion'
import '../../scss/Grocery.scss';
import leftArrow from '../../assets/icons/short-arrow-left.svg'
import rightArrow from '../../assets/icons/short-arrow-right.svg'
import plus from '../../assets/icons/plus-green.svg'
import remove from '../../assets/icons/remove-plus.svg'
import check from '../../assets/icons/check.svg'

class GroceryList extends Component {
    state = {
        groceries: '',
        week: getWeek(new Date()),
        display: false,
        remove: true,

    }

    componentDidMount() {
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

    componentDidUpdate(_prevP, prevS) {
        prevS.week!==this.state.week&&
        axios.get(`http://localhost:8080/groceries/${this.state.week}`)
        .then(res => {
            this.setState({
                groceries: res.data.sort((x, y) => {
                    return (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1;
                })
            })
        })
        .catch(console.error)

        prevS.week===getWeek(new Date())&&this.state.week===(getWeek(new Date())-1)&&
        this.setState({
            remove: false
        })

        prevS.week===(getWeek(new Date())-1)&&this.state.week===(getWeek(new Date()))&&
        this.setState({
            remove: true
        })
        
        prevS.week===getWeek(new Date())&&getWeek(new Date())===1&&this.state.week===52&&
        this.setState({
            remove: false
        })

        prevS.week===52&&this.state.week===getWeek(new Date())&&getWeek(new Date())===1&&
        this.setState({
            remove: true
        })
    }

    handleRemoveGrocery = (id) => {
        axios.delete(`http://localhost:8080/groceries/${id}`)
        .then(()=>{
            axios.get(`http://localhost:8080/groceries/${this.state.week}`)
            .then(res => {
                this.setState({
                    groceries: res.data.sort((x, y) => {
                        return (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1;
                    })
                })
            })
            .catch(console.error)
        })
        .catch()
    }

    handleAddGrocery = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/groceries`, { 
            food: e.target.itemName.value,
            weight: parseInt(e.target.itemWeight.value),
            week: this.state.week,
            isCompleted: false 
        })
        .then(() => {
            axios.get(`http://localhost:8080/groceries/${this.state.week}`)
            .then(res => {
                this.setState({
                    groceries: res.data.sort((x, y) => {
                        return (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1;
                    })
                })
            })
            .catch(console.error)
        })
        .catch()
        e.target.reset()
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

    crossOffItem = (id) => {
        axios.put(`http://localhost:8080/groceries/${id}`)
        .then(() => {
            axios.get(`http://localhost:8080/groceries/${this.state.week}`)
            .then(res => {
                this.setState({
                    groceries: res.data.sort((x, y) => {
                        return (x.isCompleted === y.isCompleted)? 0 : x.isCompleted? 1 : -1;
                    })
                })
            })
            .catch(console.error)
        })
        .catch()
    }

    render() {
        return (
            <div className="grocery">
                <div className="grocery__banner">
                    <h1 className="grocery__banner-title">Grocery List</h1>
                    <h2 className="grocery__banner-subtitle">Buy precisely what you need</h2>
                    <div className="grocery__container">
                        <img className="grocery__arrow" onClick={this.handlePrevious} src={leftArrow} alt="left arrow"/>
                        <span className="grocery__week">
                            {this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}
                        </span>
                        <img className="grocery__arrow" onClick={this.handleNext} src={rightArrow} alt="right arrow"/>
                    </div>
                </div>
                <div className="grocery__user">
                    <h2 className="grocery__user-title">
                        Your Items
                    </h2 >
                    <form className="grocery__user-form" style={{ display: this.state.remove ? "flex" : "none" }} onSubmit={this.handleAddGrocery}>
                        <button className="grocery__user-add" type="submit">
                                <img className="grocery__user-icon" src={plus} alt="plus sign"/>
                        </button>
                        <input className="grocery__user-item" required type="text" pattern="[A-Za-z -]{3,}" name="itemName" placeholder="Add item"/>
                        <input className="grocery__user-weight" required type="number" name="itemWeight" placeholder="Weight (g)"/>
                    </form>
                    <ul className="grocery__list">
                    {this.state.groceries&&this.state.groceries.map(grocery =>
                        grocery.category==="user item"&&grocery.week===this.state.week&&
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
                            <img className="item__remove" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemoveGrocery(grocery.id)} src={remove} alt="minus symbol"/>
                        </li>
                    )}
                    </ul>
                </div>
                <div className="grocery__recipe">
                    <h2 className="grocery__recipe-title">
                        Recipe Items
                    </h2>
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
                </div>
            </div>
        );
    }
}

export default GroceryList;