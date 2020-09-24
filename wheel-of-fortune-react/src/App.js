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
    deleted:[],
    added:[],
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
          removed:[],
          added:[]
        });
        break;
      case 'retro':
        this.setState({
          pieList: [...this.state.retroList],
          removed:[],
          added:[]
        });
        break;
      case 'sprint-planning':
        this.setState({
          pieList: [...this.state.spriintPlanList],
          removed:[],
          added:[]
        });
        break;
      default:
        console.log('cannot get mode for determine')
    }
  }



  resetCan = () => {
    this.state.allList.map(ele => axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/update-can', ele))
  }


  reSetElementList = (name, mode) => {

    const pieList = [...this.state.pieList];
    let updatedPieList;
    
    const canToDelete=pieList.find(ele=>ele.name===name)
    if(canToDelete){
      if (pieList.length >= 4) {
        updatedPieList = pieList.filter(element => {
          return element.name !== name
        });
        this.state.deleted.push(canToDelete);
        // axios.delete(`https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sirius-standup/${canToDelete.id}`)
      } else {
        updatedPieList = pieList
      }
    }else {
      console.log(this.state.allList);
      let newCan = this.state.allList.find(ele => ele.name === name);
      this.state.added.push(newCan);
      // axios.post('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/newStandupCan',newCan)
      newCan.mode = mode;
      updatedPieList = [...pieList, newCan]
    }
    this.setState({
      pieList: updatedPieList
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
      <div className="app">
        <LeftBox
          mode={this.state.mode}
          allList={this.state.allList}
          pieList={this.state.pieList}
          reSetElementList={this.reSetElementList}
        />
        <MidBox
          pieList={this.state.pieList}
          colorsList={this.state.colorsList}
          added={this.state.added}
          deleted={this.state.deleted}
          resetCan={this.resetCan}
          mode={this.state.mode}
          shuffleWheel={this.shuffleWheel}
        />
        <RightBox determinePieList={this.determinePieList} />
      </div>


    );
  }

}

export default App;
