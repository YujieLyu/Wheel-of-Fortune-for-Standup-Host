import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput/formInput'

class AddElement extends Component {

    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newCandidate = {
            name: this.state.name
        }
        this.props.addElement(newCandidate);
        if (this.state.name !== '') {
            axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/new', newCandidate)
                .then(res => {
                    console.log(res);
                    console.log(res.data())
                })
            this.setState({
                name: ''
            })
        }

    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <div className="addElementForm">
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        value={this.state.name}
                        label="Add new candidate" />
                </form>
            </div>
        )
    }
}

export default AddElement