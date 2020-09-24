import React, { Component } from 'react';
import './leftBox.scss';
import axios from 'axios'

import AddElement from './AddElement';

import CandidateList from '../components/CandidateList/candidateList';

class ElementList extends Component {
    constructor() {
        super();
        this.state = {
            refresh: false
        }
    }

    handleChange = (ele) => {
        this.props.reSetElementList(ele.name)
    }
    handleClick=(eleInAll,eleInPie)=>{
        if(eleInAll){
            axios.delete(`https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sirius-all/${eleInAll.id}`)
        }
        if(eleInPie){
            axios.delete(`https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sirius-standup/${eleInAll.id}`)
        }
    }
    render() {
        return (
            <div className="LeftBox">
                <div className="title">
                    <h1>{this.props.mode} Wheel</h1>
                    <p>(Ver 4.0.0.dev1.200922_beta)</p>
                </div>
                <p>No less than 3 options</p>
                <CandidateList
                    allList={this.props.allList}
                    pieList={this.props.pieList}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} 
                    />
                <AddElement allList={this.props.allList}
                    pieList={this.props.pieList} />
            </div>
        )
    }
}

export default ElementList
