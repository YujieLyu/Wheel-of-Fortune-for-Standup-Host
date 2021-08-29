import React, { Component } from 'react';
import './leftBox.scss';


import AddElement from './AddElement';

import CandidateList from '../components/CandidateList/candidateList';
import ToggleTips from '../components/ToggleTips/toggleTips';

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
    handleClick = (eleInAll, eleInPie) => {
        this.props.deleteCan(eleInAll, eleInPie)
    }
    render() {
        return (
            <div className="LeftBox">
                <div className="title">
                    <h1>{this.props.mode} Wheel</h1>
                    <p>(210824_beta)</p>
                </div>
                <p>No less than 3 options</p>
                <CandidateList
                    allList={this.props.allList}
                    pieList={this.props.pieList}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                />
                <AddElement
                    allList={this.props.allList}
                    pieList={this.props.pieList}
                    addCan={this.props.addCan} />
                <ToggleTips title="add/delete tips"
                    content="Need to refresh the page before deleting the newly added candidates temporarily. The developer is struggling with the problem of refetching data after component update" />
            </div>
        )
    }
}

export default ElementList
