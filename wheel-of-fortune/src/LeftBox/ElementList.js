import React, { Component } from 'react';
import './leftBox.scss'

import AddElement from './AddElement';

class ElementList extends Component {

    handleChange = (id) => {
        this.props.reSetElementList(id)
        console.log(id)
    }

    createList() {
        let elementList = this.props.elementList;
        return elementList.length > 0 ? (
            elementList.map(ele =>
                <div key={ele.id}>
                    <input type="checkbox" defaultChecked={this.props.checkedList.filter(e => e.id === ele.id).length > 0} onChange={() => { this.handleChange(ele.id) }} ></input>
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
                <h3>Customize the wheel</h3>
                <p>(Ver 2.1.0.dev1.200616_beta)</p>
                <p>No less than 3 options</p>
                {this.createList()}
                <AddElement addElement={this.addElement} />
            </div>
        )
    }
}

export default ElementList
