import React, { Component } from 'react';
import '../../scss/RecipeModal.scss';
import close from '../../assets/icons/reply.svg'

class RecipeModal extends Component {
    state = {
        display: false,
    }

    closeIframe = () => {
        this.props.resetSrc();
        this.setState({
            display: false,
        });
    };

    componentDidUpdate(_prevP, prevS) {
        (prevS.display === false) && this.props.src &&
        this.setState({
            display: true,
        });
    }

    render() {
        return (
            <div className="recipe" style={{ display: this.state.display ? "initial" : "none" }}>
                <div className="recipe__frame">
                    <img className="recipe__close" src={close} alt="x symbol" onClick={this.closeIframe} />
                    <iframe className="recipe__source" title="selected meal recipe website" src={this.props.src}></iframe>
                </div>
            </div>
        );
    }
}

export default RecipeModal;