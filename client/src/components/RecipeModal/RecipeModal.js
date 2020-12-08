import React, { Component } from 'react';
import '../../scss/Home.scss';
import close from '../../assets/icons/close.svg'

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
            <div style={{ display: this.state.display ? "initial" : "none" }}>
                <div>
                    <div>
                        <img src={close} alt="x symbol" onClick={this.closeIframe} />
                    </div>
                    <iframe title="selected meal recipe website" width="500" height="500" src={this.props.src}></iframe>
                </div>
            </div>
        );
    }
}

export default RecipeModal;