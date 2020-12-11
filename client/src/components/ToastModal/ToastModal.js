import React, { Component } from 'react';
import '../../scss/ToastModal.scss';

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
            <div className="toast" style={{ display: this.state.display ? "initial" : "none" }}>
                <div className="toast__frame">
                <h1>{`Successfully added ${this.props.meal} to ${this.props.day} of Week ${this.props.week}`}</h1>
                </div>
            </div>
        );
    }
}

export default RecipeModal;