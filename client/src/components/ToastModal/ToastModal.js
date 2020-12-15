import React, { Component } from 'react';
import { getWeek } from 'date-fns';
import check from '../../assets/icons/check-green.svg'
import '../../scss/ToastModal.scss';

// Toast modal component
class ToastModal extends Component {
    // state of display for the modal
    state = {
        display: false
    }

    componentDidUpdate(_prevP, prevS) {
        // when the sate is updated after mount sets the display to true to keep modal rendered and passes props value to state values
        (prevS.display === false) && this.props.toast &&
        this.setState({
            display: true,
        });

        // Timeout used to delay hiding the modal
        prevS.display===true&&this.state.display===true&&
        setTimeout(()=>{this.setState({
            display: false,
        }); this.props.resetToast()}, 5000)
    }

    render() {
        return (
            <div className="toast" style={{ display: this.state.display ? "flex" : "none" }}>
                <span className="toast__select">
                    <img className="toast__select-icon" src={check} alt=""/>
                </span>
                <h1 className="toast__title">
                    {`Successfully added to ${this.props.day} for ${this.props.week===getWeek(new Date())?'the Current Week': 'Week '+this.props.week}`}
                </h1>
            </div>
        );
    }
}

export default ToastModal;