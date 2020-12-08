import React, { Component } from 'react';
import '../../scss/Home.scss';
import axios from 'axios';
import select from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove.svg'
import close from '../../assets/icons/close.svg'
import { meals } from '../../utils/tempData'
import { weightConversion } from '../../utils/weightConversion'
import { v4 as uuidv4 } from 'uuid';

class RecipeModal extends Component {
    // state for meal search and select page
    state = {
        display: false,
    }

    closeIframe = () => {
        this.props.resetSrc()
        this.setState({
        display: false,
        });
    };

    componentDidMount() {
        this.props.src&&
        this.setState({
            display: true,
        });
    }

    componentDidUpdate(_prevP, prevS) {
        if ((prevS.display === false) && this.props.src) {
            this.setState({
                display: true,
            });
        }
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