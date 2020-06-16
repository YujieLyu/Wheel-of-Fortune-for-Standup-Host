import React, { Component } from 'react';
import './midBox.scss';

class Pie extends Component {
    state = {
        rotateAngle: null,
        sliceAngle: 360 / this.props.elementList.length,
        skewValue: 360 / this.props.elementList.length + 90
    }

    createPie() {
        let elementList = [...this.props.elementList]
        let sliceAngle, skewValue;
        sliceAngle = 360 / elementList.length;
        skewValue = sliceAngle + 90;

        return elementList.length > 0 ? (
            elementList.map((ele, i) =>
                (<div key={ele.id}>
                    <li className="midBoxPie__pieSlice" style={{
                        transform: 'rotate(' + sliceAngle * i + 'deg) skewY(' + skewValue + 'deg)',
                        background: this.props.colorList[i]
                    }}>
                        <div className="midBoxPie__pieSliceName" style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>{elementList[i].name}</div>
                    </li>
                </div >)
            )) : (null);
    }

    render() {
        return (
            <div className="MidBox" >
                <ul className="midBoxPie" id="pie">
                    {this.createPie()}
                    <button className="midBoxSpin" >Go</button>
                </ul>
            </div>
        )
    }

}


export default Pie;