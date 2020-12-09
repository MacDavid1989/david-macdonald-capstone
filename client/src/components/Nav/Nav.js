import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../../scss/Home.scss';
function Nav() {

    return (
        <div>
            <NavLink to="/">Hello</NavLink>
            <NavLink to="/search">Meal Search</NavLink>
            <NavLink to="/my meals">Meal Plan</NavLink>
            <NavLink to="/grocery list">Grocery List</NavLink>
        </div>
    );
}


export default Nav;