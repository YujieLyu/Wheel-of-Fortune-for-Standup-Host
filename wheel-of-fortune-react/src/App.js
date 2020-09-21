import React, { Component } from 'react';
import './app.scss';
import axios from 'axios';
import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/RightBox';


class App extends Component {

  state = {
    mode: 'Standup',
    allList: [],
    pieList: [],
    originPieList: [],
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
          pieList: standupList,
          originPieList: standupList
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
    this.setState({ mode })
    switch (mode) {
      case 'standup':
        this.setState({
          pieList: [...this.state.standupList],
          originPieList: [...this.state.standupList]
        });
        break;
      case 'retro':
        this.setState({
          pieList: [...this.state.retroList],
          originPieList: [...this.state.retroList]
        });
        break;
      case 'sprint-planning':
        this.setState({
          pieList: [...this.state.spriintPlanList],
          originPieList: [...this.state.spriintPlanList]
        });
        break;
      default:
        console.log('cannot get mode for determine')
    }
  }

  reSetElementList = (name, mode) => {

    const pieList = [...this.state.pieList];
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
      console.log(this.state.allList);
      let newCan = this.state.allList.find(ele => ele.name === name);
      newCan.mode = mode;
      updatedPieList = [...pieList, newCan]
    }
    this.setState({
      pieList: updatedPieList
    })

  }

  resetCan = () => {
    this.state.allList.map(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
  }


  addElement = (newEle) => {
    newEle.id = this.state.allList.length;
    let updatedPieList = [...this.state.pieList, newEle];
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
              mode={this.state.mode}
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
              originPieList={this.state.originPieList}
              colorsList={this.state.colorsList}
              resetCan={this.resetCan}
              mode={this.state.mode}
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
