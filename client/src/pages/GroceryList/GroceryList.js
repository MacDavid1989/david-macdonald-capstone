import React, { Component } from 'react';
import axios from 'axios';
import remove from '../../assets/icons/remove.svg'
import { weightConversion } from '../../utils/weightConversion'
import '../../scss/Home.scss';

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

    handleRemoveGrocery = () => {
        // delete request to remove item from grocery goes here
    }

    render() {
        return (
            <div>
                <h1>Grocery List</h1>
                <ul>
                {this.state.groceries&&this.state.groceries.map(grocery =>
                    <li key={grocery.id} className="groceryList">
                        <img className="groceryList-select" onClick={()=>this.handleRemoveGrocery(grocery.id)} src={remove} alt="minus symbol"/>
                        <span>
                            {`${weightConversion(grocery.weight)}`}
                        </span>
                        <span>
                            {`${grocery.food.toLowerCase()}`}
                        </span>
                        <img className="groceryList-select" width="100" height="100" src={grocery.image} alt={`${grocery.food}`}/>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default GroceryList;