import React, { Component } from 'react';
import './leftBox.scss';

import AddElement from './AddElement';

class ElementList extends Component {

    handleChange = (name) => {
        this.props.reSetElementList(name)
    }

    createList() {
        let allList = [...this.props.allList];
        return allList.length > 0 ? (
            allList.map(ele =>
                <div key={ele.id}>
                    <input type="checkbox"
                        checked={this.props.pieList.filter(e => e.name === ele.name).length > 0}
                        onChange={() => { this.handleChange(ele.name) }} ></input>
                    <label htmlFor={ele.id}>{ele.name}</label>
                </div>
            )) : (<div>
                Loading...
            </div>)
    }

    // addElement = (newEle) => {
    //     let updatedAllList = [...this.props.allList, newEle];
    //     let updatedPieList = [...this.props.pieList, newEle];
    //     this.setState({
    //         allList: updatedAllList,
    //         pieList: updatedPieList
    //     })
    // }

    render() {
        return (
            <div className="LeftBox">
                <h3>Customize the wheel</h3>
                <p>(Ver 2.1.1.dev1.200621_beta)</p>
                <p>No less than 3 options</p>
                {this.createList()}
                <AddElement addElement={this.props.addElement} />
            </div>
        )
    }
}

export default ElementList
