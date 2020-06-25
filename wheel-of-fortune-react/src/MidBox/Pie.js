import React, { Component } from 'react';
import axios from 'axios';
import './midBox.scss';

class Pie extends Component {
    state = {
        degree: null,
        pieList: [],
        colorList: []
    }

    componentDidMount() {

        axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/candidates')
            .then(res => {
                const pieList = res.data;
                this.setState({ pieList });
            })

        axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/colors')
            .then(res => {
                const colorList = res.data;
                this.setState({ colorList })
            })

            
    }

    createPie() {
        let pieEleList = [...this.state.pieList]
        let sliceAngle, skewValue;
        sliceAngle = 360 / pieEleList.length;
        skewValue = sliceAngle + 90;
        // console.log(this.state.colorList)

        return pieEleList.length > 0 ? (
            pieEleList.map((ele, i) =>
                (<div key={ele.id}>
                    <li className="midBoxPie__pieSlice" style={{
                        transform: 'rotate(' + sliceAngle * i + 'deg) skewY(' + skewValue + 'deg)',
                        background: this.state.colorList[i].hex
                    }}>
                        <div className="midBoxPie__pieSliceName" style={{ transform: 'skewY(' + (180 - skewValue) + 'deg) rotate(' + sliceAngle / 2 + 'deg)' }}>{pieEleList[i].name}</div>
                    </li>
                </div >)
            )) : (null);
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