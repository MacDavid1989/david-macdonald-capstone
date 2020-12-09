import React, { Component } from 'react';
import axios from 'axios';
import remove from '../../assets/icons/remove.svg'
import { weightConversion } from '../../utils/weightConversion'
import '../../scss/GroceryList.scss';

class GroceryList extends Component {
    state = {
        groceries: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/groceries`)
        .then(res => {
            this.setState({
                groceries: res.data
            })
        })
        .catch(console.error)
    }

    handleRemoveGrocery = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8080/groceries`, { 
            id: id
        })
        .then(response => {
            console.log(response)
        })
        .catch()
    }

    handleAddGrocery = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/groceries`, { 
            food: e.target.itemName.value,
            weight: e.target.itemWeight.value 
        })
        .then(response => {
            console.log(response)
        })
        .catch()
        e.target.reset()
    }

    render() {
        return (
            <div>
                <h1>Grocery List</h1>
                <form onSubmit={this.handleAddGrocery}>
                    <input required type="text" name="itemName" placeholder="Add item name"/>
                    <input required type="number" pattern="[0-9]" name="itemWeight" placeholder="Add item weight"/>
                    <button type="submit">Add</button>
                </form>
                <ul>
                {this.state.groceries&&this.state.groceries.map(grocery =>
                    <li key={grocery.id} className="groceryList">
                        <span>
                            {`${weightConversion(grocery.weight)}`}
                        </span>
                        <span>
                            {`${grocery.food.toLowerCase()}`}
                        </span>
                        <img className="groceryList-select" onClick={()=>this.handleRemoveGrocery(grocery.id)} src={remove} alt="minus symbol"/>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default GroceryList;