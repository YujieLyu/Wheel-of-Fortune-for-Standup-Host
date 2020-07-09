import React, { Component } from 'react';
import axios from 'axios';
import './midBox.scss';

class Pie extends Component {
    state = {
        degree: null,
        host: null
    }

    createPie() {
        let pieList = [...this.props.pieList]
        let colorsList = [...this.props.colorsList]
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

    alertHost = (deg) => {
        let dist = 360 - (deg % 360);
        let host = Math.floor(dist * this.props.pieList.length / 360);
        let hostName = this.props.pieList[host].name;
        this.setState({ host });

        console.log(this.props.pieList)
        console.log(this.props.pieList[host].id)

        alert("Congrats, " + hostName + "! You will run the next stand-up")

        // console.log();
    }

    // handleDetele = (host) => {
    //     const deleteCan = {
    //         id: this.props.pieList[host].id
    //     }
    //     if (this.props.pieList.length >= 4) {
    //         console.log("delete" + deleteCan)
    //         axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-can', { data: deleteCan });
    //     } else {
    //         this.props.resetCan();
    //         axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-can', { data: deleteCan });
    //     }
    // }

    handleClick = () => {
        let x = 1024;
        let y = 60204;
        let deg = Math.floor(Math.random() * (x - y)) + y;
        this.setState({
            degree: deg
        })
        setTimeout(() => this.alertHost(deg), 5500);

        // console.log(this.props.originCan);

        const pieList = this.props.pieList;
        const originPieList = this.props.originPieList;
        
        // switch(this.props.mode){
        //     case "Standup":
        //         originPieList.map(ele => axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-can', { data: ele }));
        //         break;
        //     case "Retro":
                
        //         break;
        //     case "Sprint-planning":
               
        //         break;
        // }

        
        // if (pieList >= 4) {
        //     console.log(this.props.pieList);
        //     pieList.map(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
        // } else {
        //     this.props.resetCan();
        // }
        console.log(this.props.pieList);
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