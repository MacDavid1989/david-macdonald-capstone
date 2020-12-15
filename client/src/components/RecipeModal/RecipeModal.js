import React, { Component } from 'react';
import close from '../../assets/icons/long-arrow-left.svg'
import '../../scss/RecipeModal.scss';

// Recipe modal component
class RecipeModal extends Component {
    state = {
        display: false,
    }

    // onClick handler to close modal by calling the resetSrc function and setting display state
    closeIframe = () => {
        this.props.resetSrc();
        this.setState({
            display: false,
        });
    };

    componentDidUpdate(_prevP, prevS) {
        // when the sate is updated after mount sets the display to true to keep modal rendered and passes props value to state values
        (prevS.display === false) && this.props.src &&
        this.setState({
            display: true,
        });
    }

    render() {
        return (
            <div className="recipe" style={{ display: this.state.display ? "flex" : "none" }}>
                <div className="recipe__frame">
                    <img className="recipe__close" src={close} alt="x symbol" onClick={this.closeIframe} />
                    <iframe className="recipe__source" title="selected meal recipe website" src={this.props.src}></iframe>
                </div>
            </div>
        );
    }
}

export default RecipeModal;