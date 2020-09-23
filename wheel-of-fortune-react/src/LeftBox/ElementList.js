import React, { Component } from 'react';
import './leftBox.scss';

import AddElement from './AddElement';

import CandidateList from '../components/CandidateList/candidateList';

class ElementList extends Component {

    handleChange = (name) => {
        this.props.reSetElementList(name)
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
                    handleChange={this.handleChange} />
                <AddElement addElement={this.props.addElement} />
            </div>
        )
    }
}

export default ElementList
