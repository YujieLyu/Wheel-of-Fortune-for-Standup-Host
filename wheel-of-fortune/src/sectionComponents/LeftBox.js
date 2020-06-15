import React from 'react';
import ElementList from '../ElementList/index';

const LeftBox = ({ elementList,reSetElementList }) => {

    return (
        <div className="LeftBox">
            <ElementList elementList={elementList} reSetElementList={reSetElementList} />
        </div>
    )
}

export default LeftBox;