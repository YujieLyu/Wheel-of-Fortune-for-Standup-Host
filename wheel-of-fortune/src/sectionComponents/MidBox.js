import React from 'react';
import Pie from '../Pie/index';

const MidBox =({elementList})=>{
    return(
        <div className="MiddleBox">
            <Pie elementList={elementList} />
        </div>
    )
}

export default MidBox;