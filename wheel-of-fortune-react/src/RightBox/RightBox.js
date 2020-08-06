import React, { Component } from 'react';
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
                    <button className="standupBtn" value="standup" disabled={this.state.standupBtn}
                        onClick={this.handleClick}>Standup</button>
                    <button className="retroBtn" value="retro" disabled={this.state.retroBtn}
                        onClick={this.handleClick}>Retro</button>
                    <button className="sprintPlanBtn" value="sprint-planning" disabled={this.state.sprintPlanBtn}
                        onClick={this.handleClick}>Sprint Planning</button>
                </div>

            </div>
        )
    }
}

export default RightBox;