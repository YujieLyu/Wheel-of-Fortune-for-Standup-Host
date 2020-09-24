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
                    The functions of the wheels have been improved, including:<br/>
                    1. Removing candidates<br/>
                    2. Recording the last defined candidate list<br/>
                    Well, the developer need a bit more time to perfect these features<br/>
                </div>
            )}
        </div>
    );
}

export default ToggleTips
/**
 * The wheels are greatly upgraded!<br/>
                The functions of the wheels can be run normally, I hope you all have fun. <br/>
                Sorry for the trouble caused by the previous imperfect version. <br/>
                The delay was because the developer encountered a problem that could not be solved, but after she took a lot of courses, she finally found a solution.<br/>
 */