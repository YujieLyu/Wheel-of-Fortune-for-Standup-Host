import React, { Component } from 'react';
import axios from 'axios';

class AddElement extends Component {
    state = {
        name: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newCandidate = {
            name: this.state.name
        }
        axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/new', newCandidate)
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
        if (this.state.name !== '') {
            this.props.addElement(this.state);
        }
        this.setState({
            name: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
        // console.log(this.state)
    }

    render() {
        return (
            <div className="addElementForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.name}></input>
                    <button className="addBtn">Add New Candidate</button>
                </form>
            </div>
        )
    }
}

export default AddElement