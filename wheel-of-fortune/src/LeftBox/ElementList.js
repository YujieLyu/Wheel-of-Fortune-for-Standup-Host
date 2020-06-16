import React, { Component } from 'react';
import './leftBox.scss'

import AddElement from './AddElement';

class ElementList extends Component {

    state = {
        checkStatus: true
    }


    handleChange = (id) => {
        this.props.reSetElementList(id)
        console.log(id)
    }

    createList() {
        let elementList = this.props.elementList;
        return elementList.length > 0 ? (
            elementList.map(ele =>
                <div key={ele.id}>
                    <input type="checkbox" defaultChecked={this.state.checkStatus} onChange={() => { this.handleChange(ele.id) }} ></input>
                    <label htmlFor={ele.id}>{ele.name}</label>
                </div>
            )) : (<p>Nothing here</p>)
    }

    addElement = (newEle) => {
        this.props.addElement(newEle);
    }

    render() {
        return (
            <div className="LeftBox">
                <h2>Customize the wheel</h2>
                <p>(Ver 1.2.1.200612_beta)</p>
                <p>No less than 3 options</p>
                {this.createList()}
                <AddElement addElement={this.addElement} />
            </div>
        )
    }
}

export default ElementList
