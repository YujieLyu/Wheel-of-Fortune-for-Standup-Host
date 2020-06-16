import React, { Component } from 'react';
import './midBox.scss';

class Pie extends Component {

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
    handleClick() {
        let x = 1024;
        let y = 60204;
        return  Math.floor(Math.random() * (x - y)) + y;
        // let deg = Math.floor(100000 + Math.random()  * 90000);
       
    }

    spin(){
        let deg=this.mySpinner();
        return {
            rotate:deg + 'deg'
        };
    }
    render() {
        let x = 1024;
        let y = 60204;
        let deg = Math.floor(Math.random() * (x - y)) + y;
        return (
            <div className="MidBox" >
                <ul className="midBoxPie" id="pie" style={this.spin()}>
                    {this.createPie()}
                    <button className="midBoxSpin" onClick={this.handleClick()}>Go</button>
                </ul>
            </div>
        )
    }

}


export default Pie;