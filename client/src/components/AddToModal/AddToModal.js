import React, { Component } from 'react';
import '../../scss/AddToModal.scss';
import close from '../../assets/icons/reply.svg'

class RecipeModal extends Component {
    state = {
        display: false,
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
        });
    }

    render() {
        return (
            <div onClick={this.closeAddTo} className="addTo" style={{ display: this.state.display ? "flex" : "none" }}>
                <div className="addTo__frame">
                    <h2 className="addTo__title">Add To Meals</h2>
                    <h3 className="addTo__date" onClick={()=> {this.props.addToDate(this.props.meal, this.props.id); this.props.resetDisplay()}}>Sunday</h3>
                    <h3 className="addTo__date">Monday</h3>
                    <h3 className="addTo__date">Tuesday</h3>
                    <h3 className="addTo__date">Wednesday</h3>
                    <h3 className="addTo__date">Thursday</h3>
                    <h3 className="addTo__date">Friday</h3>
                    <h3 className="addTo__date">Saturday</h3>
                </div>
            </div>
        );
    }
}

export default RecipeModal;