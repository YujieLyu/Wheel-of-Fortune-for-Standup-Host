import React, { Component } from 'react';
import './midBox.scss';

class Pie extends Component {
    state = {
        rotateAngle: null,
        sliceAngle: 360 / this.props.elementList.length,
        skewValue: 360 / this.props.elementList.length + 90
    }

    // createPie() {
    //     let elementList = [...this.props.elementList]
    //     let rotateAngle, sliceAngle, skewValue;
    //     sliceAngle = 360 / elementList.length;
    //     skewValue = sliceAngle + 90;

    //     return elementList.length > 0 ? (
    //         elementList.map((ele, i) => {
    //             <div key={ele.id}>
    //                 <li className="middleBoxPie__pieSlice" style={{
    //                     transform: 'rotate(' + sliceAngle * i + 'deg) skewY(' + skewValue + 'deg)',
    //                     background: this.props.colorList[i]
    //                 }}>
    //                     <div className="middleBoxPie__pieSliceName" style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>{elementList[i].name}</div>
    //                 </li>
    //             </div >
    //         })) : (null);

    //     // if (elementList.length > 0) {
    //     //     for (let i = 0; i < elementList.length; i++) {

    //     //         rotateAngle = sliceAngle * i

    //     //         const pieSliceStyle = {
    //     //             transform: 'rotate(' + rotateAngle + 'deg) skewY(' + skewValue + 'deg)',
    //     //             background: this.props.colorList[i]
    //     //         }

    //     //         const pieSliceNameStyle = {
    //     //             transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)'


    //     //         }
    //     //         return (
    //     //             <div key={elementList[i].id} >
    //     //                 <li className="middleBoxPie__pieSlice" style={pieSliceStyle}>
    //     //                     <div className="middleBoxPie__pieSliceName" style={pieSliceNameStyle}>{elementList[i].name}</div>
    //     //                 </li>
    //     //             </div >
    //     //         )
    //     //     }
    //     // } else {
    //     //     return null;
    //     // }
    // }

    render() {

        let elementList = [...this.props.elementList]
        let rotateAngle, sliceAngle, skewValue;
        sliceAngle = 360 / elementList.length;
        skewValue = sliceAngle + 90;

        return elementList.length > 0 ? (
            elementList.map((ele, i) => (
                <div key={ele.id} className="MidBox">
                    <ul className="middleBoxPie" id="pie">
                    <li className="middleBoxPie__pieSlice" style={{
                        transform: 'rotate(' + sliceAngle * i + 'deg) skewY(' + skewValue + 'deg)',
                        background: this.props.colorList[i]
                    }}>
                        <div className="middleBoxPie__pieSliceName" style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>{elementList[i].name}</div>
                    </li>
                    <button className="middleBoxSpin" >Go</button>
                </ul>
                    
                </div >
        ))) : (null);




        return (
            <div className="MidBox" >
                <ul className="middleBoxPie" id="pie">
                    {this.createPie()}
                    <button className="middleBoxSpin" >Go</button>
                </ul>
            </div>
        )
    }

}


export default Pie;