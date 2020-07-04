import React, { Component } from 'react';
import axios from 'axios';
import './midBox.scss';

class Pie extends Component {
    state = {
        degree: null
    }



    createPie() {
        let pieList = [...this.props.pieList]
        let colorsList=[...this.props.colorsList]
        let sliceAngle, skewValue;
        sliceAngle = 360 / pieList.length;
        skewValue = sliceAngle + 90;
        // console.log(this.state.colorList)

        return pieList.length > 0 && colorsList.length > 0 ? (
            pieList.map((ele, i) =>
                (<div key={ele.id}>
                    <li className="midBoxPie__pieSlice" style={{
                        transform: 'rotate(' + sliceAngle * i + 'deg) skewY(' + skewValue + 'deg)',
                        background: colorsList[i].hex
                    }}>
                        <div className="midBoxPie__pieSliceName" style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>{pieList[i].name}</div>
                    </li>
                </div >)
            )) : (<div>
                Loading...
            </div>);
    }

    handleClick = () => {
        let x = 1024;
        let y = 60204;
        let deg = Math.floor(Math.random() * (x - y)) + y;
        this.setState({
            degree: deg
        })

        // let deg = Math.floor(100000 + Math.random()  * 90000);
    }

    render() {
        return (
            <div className="MidBox" >
                <ul className="midBoxPie" id="pie" style={{ transform: 'rotate(' + this.state.degree + 'deg)' }}>
                    {this.createPie()}
                </ul>
                <button className="midBoxSpin" onClick={this.handleClick}>GO</button>
            </div>
        )
    }
}


export default Pie;