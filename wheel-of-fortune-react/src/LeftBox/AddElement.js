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
        console.log(this.props.allList);
        this.addElement(newCandidate);
        if (this.state.name !== '') {
            axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/new', newCandidate)
                .then(res => {
                    console.log(res);
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

    addElement = (newEle) => {

        let updatedPieList = [...this.props.pieList, newEle];
        let updatedAllList = [...this.props.allList, newEle];
        newEle.id = updatedAllList.length - 1;
        this.setState({
            pieList: updatedPieList,
            allList: updatedAllList
        })
    }

    reSetElementList = (name, mode) => {

        const pieList = [...this.props.pieList];
        let updatedPieList;

        if (pieList.some(ele => ele.name === name)) {
            if (pieList.length >= 4) {
                updatedPieList = pieList.filter(ele => {
                    return ele.name !== name
                })
            } else {
                updatedPieList = pieList
            }
        } else {
            console.log(this.props.allList);
            let newCan = this.props.allList.find(ele => ele.name === name);
            newCan.mode = mode;
            updatedPieList = [...pieList, newCan]
        }
        this.setState({
            pieList: updatedPieList
        })

    }

    render() {
        return (
            <div className="addElementForm">
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        value={this.state.name}
                        label="New candidate" />
                </form>
            </div>
        )
    }
}

export default AddElement