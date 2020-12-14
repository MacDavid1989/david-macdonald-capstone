import React, { Component } from 'react';
import '../../scss/ToastModal.scss';
import { getWeek } from 'date-fns';
import check from '../../assets/icons/check-green.svg'

class RecipeModal extends Component {
    state = {
        display: false
    }

    componentDidUpdate(_prevP, prevS) {
        (prevS.display === false) && this.props.toast &&
        this.setState({
            display: true,
        });

        prevS.display===true&&this.state.display===true&&
        setTimeout(()=>{this.setState({
            display: false,
        }); this.props.resetToast()}, 3000)
    }

    render() {
        return (
            <div className="toast" style={{ display: this.state.display ? "flex" : "none" }}>
                <span className="toast__select">
                    <img className="toast__select-icon" src={check} alt=""/>
                </span>
                <h1 className="toast__title">{`Successfully added ${this.props.meal} to ${this.props.day} of ${this.props.week===getWeek(new Date())?'Current Week': 'Week '+this.props.week}`}</h1>
            </div>
        );
    }
}

export default RecipeModal;