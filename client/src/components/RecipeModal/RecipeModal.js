import React, { useEffect, useState } from 'react';
// imported icons
import close from '../../assets/icons/long-arrow-left.svg';
// styling
import '../../scss/RecipeModal.scss';

// Recipe modal component
function RecipeModal ({ src, resetSrc }) {

    const [display, setDisplay] = useState(false);
    
    useEffect(()=>{
        // when the sate is updated after mount sets the display to true to keep modal rendered
        !display&&src&&setDisplay(true);
    }, [display, src]); 
    
    // onClick handler to close modal by calling the resetSrc function and setting display state
    const closeIframe = () => {
        resetSrc();
        setDisplay(false);
    };
    
    return (
        <div className="recipe" style={{ display: display ? "flex" : "none" }}>
            <div className="recipe__frame">
                <img 
                    className="recipe__close" 
                    src={close} 
                    alt="x symbol" 
                    onClick={closeIframe} 
                />
                <iframe 
                    className="recipe__source" 
                    title="selected meal recipe website" 
                    src={src}
                ></iframe>
            </div>
        </div>
    );
};

export default RecipeModal;