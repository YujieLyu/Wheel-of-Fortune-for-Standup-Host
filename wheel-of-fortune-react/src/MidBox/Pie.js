import React, { Component } from 'react';
import axios from 'axios';
import './pie.scss';
import Slice from '../components/Slice/Slice';

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

        return pieList.length > 0 && colorsList.length > 0 ? (
            pieList.map((ele, i) =>
                (
                    <Slice key={i}
                        sliceAngle={sliceAngle}
                        index={i}
                        skewValue={skewValue}
                        pieListEle={ele}
                        colorListEle={colorsList[i]}
                    />

                )
            )) : (<div>
                Loading...
            </div>);
    }

    alertHost = (deg) => {
        let dist = 360 - (deg % 360);
        let host = Math.floor(dist * this.props.pieList.length / 360);
        let hostName = this.props.pieList[host].name;
        this.setState({ host });
        const newHost = {
            name: hostName
        }
        console.log('new host is ',newHost)
        switch (this.props.pieList[host].mode) {
            case "standup":
                axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/add-standup-host', newHost)
                    .then(res => {
                        console.log(res);
                        console.log(res.data)
                    });
                break;
            case "retro":
                axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/add-retro-host', newHost)
                    .then(res => {
                        console.log(res);
                        console.log(res.data)
                    });
                break;
            case "plan":
                axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/add-plan-host', newHost)
                    .then(res => {
                        console.log(res);
                        console.log(res.data)
                    });
                break;
        }

        alert(`Congrats, ${hostName} ! You will run the next stand-up`)
    }
Ï
    handleClick = () => {
        let x = 1024;
        let y = 60204;
        let deg = Math.floor(Math.random() * (x - y)) + y;
        this.setState({
            degree: deg
        })
        setTimeout(() => this.alertHost(deg), 5500);


        const pieList = this.props.pieList;
        const originPieList = this.props.originPieList;

        switch (pieList[0].mode) {
            case "standup":
                originPieList.forEach(ele =>
                    axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-standup',
                        { data: ele })
                        .then((res) => console.log(res))
                        .catch(err => console.log(err))
                );
                pieList.forEach(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele)
                    .catch(err => console.log(err))
                )
                break;
            case "retro":
                originPieList.forEach(ele =>
                    // console.log(ele)
                    axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-retro', { data: ele })
                        .then((res) => console.log(res))
                        .catch(err => console.log(err))
                );
                pieList.forEach(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
                break;
            case "plan":
                originPieList.forEach(ele =>
                    // console.log(ele)
                    axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-sprintplan', { data: ele })
                        .then((res) => console.log(res))
                        .catch(err => console.log(err))
                );
                pieList.forEach(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
                break;
            default:
                console.log('cannot get the mode for pie');
        }


        // if (pieList >= 4) {
        //     console.log(this.props.pieList);
        //     pieList.map(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
        // } else {
        //     this.props.resetCan();
        // }
        // console.log(this.props.pieList);
        // console.log(this.props.originPieList);
    }



    render() {
        return (
            <div className="MidBox" >
                <ul className="pie" id="pie" style={{ transform: 'rotate(' + this.state.degree + 'deg)' }}>
                    {this.createPie()}
                </ul>
                <button className="spin" onClick={this.handleClick}>GO</button>
            </div>
        )
    }
}


export default Pie;