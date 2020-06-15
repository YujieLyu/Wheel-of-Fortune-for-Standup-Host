import React, { Component } from 'react';

class AddElement extends Component {
    state = {
        name: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

export default AddElement