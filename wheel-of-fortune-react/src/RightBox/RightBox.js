import React, { Component } from 'react';
import CustomButton from '../components/CustomButton/customButton';
import './rightBox.scss'

class RightBox extends Component {

    state = {
        standupBtn: true,
        retroBtn: false,
        sprintPlanBtn: false
    }


    handleClick = (e) => {
        console.log(e.target.value)
        this.props.determinePieList(e.target.value)

        // e.target.disabled = e.target.disabled ? false : true;
        switch (e.target.value) {
            case "standup":
                this.setState({
                    standupBtn: true,
                    retroBtn: false,
                    sprintPlanBtn: false
                });
                break;
            case "retro":
                this.setState({
                    standupBtn: false,
                    retroBtn: true,
                    sprintPlanBtn: false
                });
                break;
            case "sprint-planning":
                this.setState({
                    standupBtn: false,
                    retroBtn: false,
                    sprintPlanBtn: true
                });
                break;
            default:
                console.log('cannot get the mode for button')
        }
    }


    render() {
        return (
            <div className="RightBox">
                <div className="btnGroup">
                    <CustomButton
                        value="standup"
                        isOn={this.state.standupBtn}
                        handleClick={this.handleClick}
                        name="Standup" />
                    <CustomButton
                        value="retro"
                        isOn={this.state.retroBtn}
                        handleClick={this.handleClick}
                        name="Retro" />
                    <CustomButton
                        value="sprint-planning"
                        isOn={this.state.sprintPlanBtn}
                        handleClick={this.handleClick}
                        name="Sprint Planning" />
                </div>

            </div>
        )
    }
}

export default RightBox;