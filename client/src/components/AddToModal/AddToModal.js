import React, { Component } from 'react';
import { getWeek } from 'date-fns';
import '../../scss/AddToModal.scss';
import ToastModal from '../ToastModal'

class RecipeModal extends Component {
    state = {
        display: false,
        week: getWeek(new Date()),
        meal: '',
        id: '',
        previous: false,
        toast: false
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
            <div onClick={this.closeAddTo} className="addTo" style={{ display: this.state.display ? "flex" : "none" }}>
                <div className="addTo__frame">
                    <button style={{ display: this.state.previous ? "flex" : "none" }} onClick={this.handlePrevious}>previous</button>
                    <h2 className="addTo__title">{this.state.week===getWeek(new Date())?`Add to Current Week`:`Add to Week ${this.state.week}`}</h2>
                    <button onClick={this.handleNext}>next</button>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Sunday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Monday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Tuesday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Wednesday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Thursday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Friday</h3>
                    <h3 className="addTo__date" onClick={(e)=> {this.props.addToDate(this.state.meal, this.state.id, e.target.innerText, this.state.week); this.props.resetDisplay(); this.setState({toast: true})}}>Saturday</h3>
                </div>
            </div>
            <ToastModal toast={this.state.toast} resetToast={this.resetToast}/>
            </>
        );
    }
}

export default RecipeModal;