import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../../scss/Home.scss';

class Nav extends Component {
    state = {
        display: false,
        firstLink: 'Search',
        secondLink: 'Grocery List'
    }

    componentDidMount() {
        this.props.location.pathname==='/'&&
        this.setState({
            display: false,
            firstLink: 'Search',
            secondLink: 'Grocery List'
        });
        
        this.props.location.pathname==='/search'&&
        this.setState({
            display: true,
            firstLink: 'My Meals',
            secondLink: 'Grocery List'
        });

        this.props.location.pathname==='/my meals'&&
        this.setState({
            display: true,
            firstLink: 'Search',
            secondLink: 'Grocery List'
        });

        this.props.location.pathname==='/grocery list'&&
        this.setState({
            display: true,
            firstLink: 'Search',
            secondLink: 'My Meals'
        });
    }

    componentDidUpdate() {
        this.state.display===true&&this.props.location.pathname==='/'&&
        this.setState({
            display: false,
            firstLink: 'Search'
        });
        
        this.state.firstLink==='Search'&&this.props.location.pathname==='/search'&&
        this.setState({
            display: true,
            firstLink: 'My Meals',
            secondLink: 'Grocery List'
        });

        this.props.location.pathname==='/my meals'&&(this.state.firstLink==='My Meals'||this.state.secondLink==='My Meals')&&
        this.setState({
            display: true,
            firstLink: 'Search',
            secondLink: 'Grocery List'
        });

        this.state.secondLink==='Grocery List'&&this.props.location.pathname==='/grocery list'&&
        this.setState({
            display: true,
            firstLink: 'Search',
            secondLink: 'My Meals'
        });
    }

    render() {
        return (
            <div>
                <Link to="/">Hello</Link>
                <Link to={`/${this.state.firstLink.toLowerCase()}`}>{this.state.firstLink}</Link>
                <Link style={{ display: this.state.display ? "initial" : "none" }} to={`/${this.state.secondLink.toLowerCase()}`}>{this.state.secondLink}</Link>
            </div>
        );
    }
}

export default withRouter(Nav);