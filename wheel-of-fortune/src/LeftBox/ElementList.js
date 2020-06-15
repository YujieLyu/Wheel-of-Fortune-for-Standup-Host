import React, { Component } from 'react';

import AddElement from './AddElement';

class ElementList extends Component {

    state = {
        checkStatus: true
    }


    handleChange = (id) => {
        this.props.reSetElementList(id)
        console.log(id)
    }

    createList () {
        let elementList = this.props.elementList;
        return elementList.length > 0 ? (
            elementList.map(ele =>
                <div key={ele.id}>
                    <input type="checkbox" defaultChecked={this.state.checkStatus} onChange={() => { this.handleChange(ele.id)}} ></input>
                    <label htmlFor={ele.id}>{ele.name}</label>
                </div>
            )) : (<p>Nothing here</p>)
    }

    addElement = (newEle) => {
        this.props.addElement(newEle);
    }

    render() {
        return (
            <div>
                {this.createList()}
                <AddElement addElement={this.addElement} />
            </div>
        )
    }
}

export default ElementList