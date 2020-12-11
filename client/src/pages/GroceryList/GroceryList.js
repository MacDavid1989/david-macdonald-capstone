import React, { Component } from 'react';
import axios from 'axios';
import remove from '../../assets/icons/remove.svg'
import { getWeek } from 'date-fns'
import { weightConversion } from '../../utils/weightConversion'
import '../../scss/GroceryList.scss';
import unchecked from '../../assets/icons/checkbox-unchecked.svg';
import checked from '../../assets/icons/checkbox-checked.svg'

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
        
        prevS.week===getWeek(new Date())&&this.state.week===52&&
        this.setState({
            remove: false
        })

        prevS.week===52&&this.state.week===getWeek(new Date())&&
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
            <div>
                <h1>Grocery List</h1>
                <button onClick={this.handlePrevious}>previous</button>
                <h1>{this.state.week===getWeek(new Date())?`Current Week`:`Week ${this.state.week}`}</h1>
                <button onClick={this.handleNext}>next</button>
                <form style={{ display: this.state.remove ? "flex" : "none" }} onSubmit={this.handleAddGrocery}>
                    <input required type="text" pattern="[A-Za-z -]{3,}" name="itemName" placeholder="Add item name"/>
                    <input required type="number" name="itemWeight" placeholder="Add item weight"/>
                    <button type="submit">Add</button>
                </form>
                <h2>
                    Your Items
                </h2>
                <ul>
                {this.state.groceries&&this.state.groceries.map(grocery =>
                grocery.category==="user item"&&grocery.week===this.state.week&&
                    <li key={grocery.id} className="groceryList">
                        <img onClick={()=>this.crossOffItem(grocery.id)} src={grocery.isCompleted?checked:unchecked} alt="unchecked box"/>
                        <span style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                            {`${weightConversion(grocery.weight)}`}
                        </span>
                        <span style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                            {`${grocery.food.toLowerCase()}`}
                        </span>
                        <img className="groceryList-select" style={{ display: this.state.remove ? "flex" : "none" }} onClick={()=>this.handleRemoveGrocery(grocery.id)} src={remove} alt="minus symbol"/>
                    </li>
                    )}
                </ul>
                <h2>
                    Recipe Items
                </h2>
                <ul>
                {this.state.groceries&&this.state.groceries.map(grocery =>
                grocery.category!=="user item"&&grocery.week===this.state.week&&
                    <li key={grocery.id} className="groceryList">
                        <img onClick={()=>this.crossOffItem(grocery.id)} src={grocery.isCompleted?checked:unchecked} alt="unchecked box"/>
                        <span style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                            {`${weightConversion(grocery.weight)}`}
                        </span>
                        <span style={{ textDecoration: grocery.isCompleted ? "line-through" : "none" }}>
                            {`${grocery.food.toLowerCase()}`}
                        </span>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default GroceryList;