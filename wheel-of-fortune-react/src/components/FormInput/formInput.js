import React from 'react';
import CustomButton from '../CustomButton/customButton';
import './formInput.scss';

const FormInput = ({ handleChange, value, label }) => {
    return (
        <div className='group'>
            <input
                className='form-input'
                type="text"
                onChange={handleChange}
                value={value}
            />
            {label ?
                (<label className={`${value.length ? 'shrink' : ''
                    } form-input-label`}
                >{label}
                </label>
                ) : null}
            <CustomButton
            value="origin"
            name="Add"

            />
        </div>
    )

}

export default FormInput;