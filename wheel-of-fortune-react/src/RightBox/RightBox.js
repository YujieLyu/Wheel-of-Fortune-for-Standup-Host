import React from 'react';
import './rightBox.scss'

const RightBox = (props) => {

    return (
        <div className="RightBox">
            <button className="shuffleButton" onClick={props.shuffleWheel}>
                Shuffle the wheel
            </button>
        </div>
    )
}

export default RightBox;