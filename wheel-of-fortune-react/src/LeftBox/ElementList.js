import React, { Component } from 'react';
import axios from 'axios';
import './leftBox.scss';

import AddElement from './AddElement';

class ElementList extends Component {

    state = {
        allList: [],
        pieList: []
    }

    componentDidMount() {
        axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/all')
            .then(res => {
                const allList = res.data;
                this.setState({ allList });
            });
        // console.log('here is all list: ' + this.state.allList);
        axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/candidates')
            .then(res => {
                const pieList = res.data;
                this.setState({ pieList });
            })
            // console.log(this.state.pieList.length);
    }

    handleChange = (id) => {
        this.props.reSetElementList(id)
        // console.log(id)
    }

    createList() {
        let elementList = [...this.state.allList];
        return elementList.length > 0 ? (
            elementList.map(ele =>
                <div key={ele.id}>
                    <input type="checkbox"
                       checked={this.state.pieList.filter(e=>e.name===ele.name).length>0}
                        onChange={() => { this.handleChange(ele.id) }} ></input>
                    <label htmlFor={ele.id}>{ele.name}</label>
                </div>
            )) : (null)
    }

    addElement = (newEle) => {
        this.props.addElement(newEle);
    }

    render() {
        return (
            <div className="LeftBox">
                <h3>Customize the wheel</h3>
                <p>(Ver 2.1.1.dev1.200621_beta)</p>
                <p>No less than 3 options</p>
                {this.createList()}
                <AddElement addElement={this.addElement} />
            </div>
        )
    }
}

export default ElementList
