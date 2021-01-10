import React, { useState, useEffect } from 'react';
import { getWeek } from 'date-fns';
// imported icons
import check from '../../assets/icons/check-green.svg'
// styling
import '../../scss/ToastModal.scss';

// Toast modal component
function ToastModal (props) {
    // state of display for the modal
    const [display, setDisplay] = useState(false)

    useEffect(()=>{
        // when the sate is updated after mount sets the display to true to keep modal rendered
        display===false&&props.toast&&
        setDisplay(true)

        // after 5 seconds, the toast modal will no longer be displayed and the resetToast function will be called
        setTimeout(()=>{
            setDisplay(false); 
            props.resetToast()
        }, 5000)
    }, [display, props]) 

    return (
        <div className="toast" style={{ display: display ? "flex" : "none" }}>
            <span className="toast__select">
                <img className="toast__select-icon" src={check} alt=""/>
            </span>
            <h1 className="toast__title">
                {`Successfully added to ${props.day} for ${props.week===getWeek(new Date())?'the Current Week': 'Week ' + props.week}`}
            </h1>
        </div>
    );
}


export default ToastModal;