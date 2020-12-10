import React, { Component } from 'react';
import { getWeek } from 'date-fns';
import '../../scss/AddToModal.scss';

class RecipeModal extends Component {
    state = {
        display: false,
        week: getWeek(new Date()),
        meal: '',
        id: ''
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
            <div onClick={this.closeAddTo} className="addTo" style={{ display: this.state.display ? "flex" : "none" }}>
                <div className="addTo__frame">
                    <button onClick={this.handlePrevious}>previous</button>
                    <h2 className="addTo__title">{this.state.week===getWeek(new Date())?`Add to Current Week`:`Add to Week ${this.state.week}`}</h2>
                    <button onClick={this.handleNext}>next</button>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Sunday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Monday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Tuesday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Wednesday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Thursday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Friday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay()}}>Saturday</h3>
                </div>
            </div>
        );
    }
}

export default RecipeModal;