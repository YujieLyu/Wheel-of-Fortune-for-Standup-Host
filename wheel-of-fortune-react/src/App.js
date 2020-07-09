import React, { Component } from 'react';
import './default.scss';
import axios from 'axios';
import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/RightBox';


class App extends Component {

  state = {
    wheelName: 'Standup',
    allList: [],
    pieList: [],
    standupList: [],
    retroList: [],
    spriintPlanList: [],
    colorsList: []
  }

  componentDidMount() {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/all')
      .then(res => {
        const allList = res.data;
        this.setState({ allList });
      });

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/colors')
      .then(res => {
        const colorsList = res.data;
        this.setState({ colorsList })
      })

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/standup')
      .then(res => {
        const standupList = res.data;
        this.setState({
          standupList,
          pieList: standupList
        });
      })

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/retro')
      .then(res => {
        const retroList = res.data;
        this.setState({ retroList })
      })

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sprint-plan')
      .then(res => {
        const spriintPlanList = res.data;
        this.setState({ spriintPlanList })
      })
  }

  determinePieList = (mode) => {
    this.setState({ wheelName: mode })
    switch (mode) {
      case 'Standup':
        this.setState({ pieList: [...this.state.standupList] });
        console.log(this.state.pieList)
        break;
      case 'Retro':
        this.setState({ pieList: [...this.state.retroList] });
        break;
      case 'Sprint-planning':
        this.setState({ pieList: [...this.state.spriintPlanList] })
    }
  }

  reSetElementList = (name) => {

    let pieList = [...this.state.standupList];

    const updatedPieList = pieList.some(ele => ele.name === name) ? (
      pieList.length >= 4 ? (pieList.filter(ele => {
        return ele.name !== name
      })) : (
          pieList
        )
    ) : (
        [...pieList, this.state.allList.find(ele => ele.name === name)]
      )
    this.setState({
      pieList: updatedPieList
    })

  }

  resetCan = () => {
    this.state.allList.map(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
  }


  addElement = (newEle) => {
    newEle.id = this.state.allList.length;
    let updatedPieList = [...this.state.standupList, newEle];
    let updatedAllList = [...this.state.allList, newEle];
    this.setState({
      pieList: updatedPieList,
      allList: updatedAllList
    })
  }

  shuffleWheel = () => {
    let updatedList = [...this.state.pieList];
    this.setState({
      pieList: updatedList.sort(() => Math.random() - 0.5)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm">
            <LeftBox
              wheelName={this.state.wheelName}
              allList={this.state.allList}
              pieList={this.state.pieList}
              reSetElementList={this.reSetElementList}
              addElement={this.addElement}
              shuffleWheel={this.shuffleWheel}
            />
          </div>
          <div className="col-sm">
            <MidBox
              pieList={this.state.pieList}
              colorsList={this.state.colorsList}
              resetCan={this.resetCan}
            />
          </div>
          <div className="col-sm">
            <RightBox determinePieList={this.determinePieList} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
