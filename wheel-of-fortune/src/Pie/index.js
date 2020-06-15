import React from 'react';

const Pie = ({ sliceNumber, elementList }) => {

    let rotateAngle, sliceAngle, skewValue;
    sliceAngle = 360 / sliceNumber;
    skewValue = sliceAngle + 90;

    const createPie = elementList.length > 0 ? (elementList.map(ele =>
        <div key={ele.id}>
            <li className="pieSlice">
                <div className="pieSliceName">{ele.name}</div>
            </li>
        </div>
    )) : (<p>Nothing</p>);



    return (
        <div >
            {createPie}
        </div>
    )
}

export default Pie;