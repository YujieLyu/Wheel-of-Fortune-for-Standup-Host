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
            case "Standup":
                this.setState({
                    standupBtn: true,
                    retroBtn: false,
                    sprintPlanBtn: false
                });
                break;
            case "Retro":
                this.setState({
                    standupBtn: false,
                    retroBtn: true,
                    sprintPlanBtn: false
                });
                break;
            case "Sprint-planning":
                this.setState({
                    standupBtn: false,
                    retroBtn: false,
                    sprintPlanBtn: true
                });
                break;
        }
    }


    render() {
        return (
            <div className="RightBox">
                <div className="btnGroup">
                    <button className="standupBtn" value="Standup" disabled={this.state.standupBtn}
                        onClick={this.handleClick}>Standup</button>
                    <button className="retroBtn" value="Retro" disabled={this.state.retroBtn}
                        onClick={this.handleClick}>Retro</button>
                    <button className="sprintPlanBtn" value="Sprint-planning" disabled={this.state.sprintPlanBtn}
                        onClick={this.handleClick}>Sprint Planning</button>
                </div>

            </div>
        )
    }
}

export default RightBox;