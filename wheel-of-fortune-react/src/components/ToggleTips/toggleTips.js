import React, { useState } from 'react';
import './toggleTips.scss';

const ToggleTips = ({ title }) => {
    const [isOpened, setIsOpened] = useState(false);

    const toggle = () => {
        setIsOpened(isOpened => !isOpened);
    }

    return (
        <div className="toggle-tip">
            <div className="tip-title" onClick={toggle}>
                {title}
            </div>
            {isOpened && (
                <div className="tip-content">
                The wheels are greatly upgraded!<br/> 
                The functions of the wheels can be run normally, I hope you all have fun. <br/> 
                Sorry for the trouble caused by the previous imperfect version. <br/> 
                The delay was because the developer encountered a problem that could not be solved, but after she took a lot of courses, she finally found a solution.<br/> 
                </div>
            )}
        </div>
    );
}

export default ToggleTips