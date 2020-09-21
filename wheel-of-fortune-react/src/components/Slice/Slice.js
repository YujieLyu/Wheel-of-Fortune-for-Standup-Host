import React from 'react';
import './styles.scss';

const Slice = ({ sliceAngle, index, skewValue, colorListEle, pieListEle }) => {
    return (
        <li className="slice" style={{
            transform: 'rotate(' + sliceAngle * index + 'deg) skewY(' + skewValue + 'deg)',
            background: colorListEle.hex
        }}>
            <div className="slice-name"
                style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>
                {pieListEle.name}
            </div>
        </li>
    )
}

export default Slice;