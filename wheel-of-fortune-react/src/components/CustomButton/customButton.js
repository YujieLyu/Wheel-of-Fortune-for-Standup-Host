import React from 'react';
import './styles.scss';

const CustomButton = ({ name,value, isOn, handleClick }) => {
    return (
        <button
            className={value}
            value={value}
            disabled={isOn}
            onClick={handleClick}>{name}</button>
    )
}

export default CustomButton