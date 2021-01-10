import React, { useEffect, useState } from 'react';
// imported icons
import close from '../../assets/icons/long-arrow-left.svg'
// styling
import '../../scss/RecipeModal.scss';

// Recipe modal component
function RecipeModal (props) {
    const [display, setDisplay] = useState(false)

    // onClick handler to close modal by calling the resetSrc function and setting display state
    const closeIframe = () => {
        props.resetSrc();
        setDisplay(false)
    };

    useEffect(()=>{
        // when the sate is updated after mount sets the display to true to keep modal rendered
        display===false&&props.src&&
        setDisplay(true)
    }, [display, props.src]) 

    return (
        <div className="recipe" style={{ display: display ? "flex" : "none" }}>
            <div className="recipe__frame">
                <img className="recipe__close" 
                    src={close} 
                    alt="x symbol" 
                    onClick={closeIframe} 
                />
                <iframe className="recipe__source" 
                    title="selected meal recipe website" 
                    src={props.src}
                ></iframe>
            </div>
        </div>
    );
}

export default RecipeModal;