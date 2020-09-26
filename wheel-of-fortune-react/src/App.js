import React, { Component } from 'react';
import './app.scss';
import axios from 'axios';
import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/RightBox';


class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'Standup',
      allList: [],
      pieList: [],
      deleted: [],
      added: [],
      standupList: [],
      retroList: [],
      spriintPlanList: [],
      colorsList: []
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.pieList !== this.props.pieList || prevProps.allList !== this.props.allList) {
      this.getAllList();
      this.getColorList();
      this.getStandupList();
      this.getRetroList();
      this.getSpriintPlanList();
    }
  }

  getAllList = () => {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/all')
      .then(res => {
        const allList = res.data;
        this.setState({ allList });
      });
  }

  getColorList = () => {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/colors')
      .then(res => {
        const colorsList = res.data;
        this.setState({ colorsList })
      })
  }

  getStandupList = () => {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/standup')
      .then(res => {
        const standupList = res.data;

        this.setState({
          standupList,
          pieList: standupList,
        });
      })
  }

  getRetroList = () => {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/retro')
      .then(res => {
        const retroList = res.data;
        this.setState({ retroList })
      })
  }

  getSpriintPlanList() {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sprint-plan')
      .then(res => {
        const spriintPlanList = res.data;
        this.setState({ spriintPlanList })
      })
  }

  componentDidMount() {
    this.getAllList();
    this.getColorList();
    this.getStandupList();
    this.getRetroList();
    this.getSpriintPlanList();
  }

  determinePieList = (mode) => {
    this.setState({ mode })
    switch (mode) {
      case 'standup':
        this.setState({
          pieList: [...this.state.standupList],
          removed: [],
          added: []
        });
        break;
      case 'retro':
        this.setState({
          pieList: [...this.state.retroList],
          removed: [],
          added: []
        });
        break;
      case 'sprint-planning':
        this.setState({
          pieList: [...this.state.spriintPlanList],
          removed: [],
          added: []
        });
        break;
      default:
        console.log('cannot get mode for determine')
    }
  }


  reSetElementList = (name, mode) => {

    const pieList = [...this.state.pieList];
    let updatedPieList;

    const canToDelete = pieList.find(ele => ele.name === name)
    if (canToDelete) {
      if (pieList.length >= 4) {
        updatedPieList = pieList.filter(element => {
          return element.name !== name
        });
        this.state.deleted.push(canToDelete);
      } else {
        updatedPieList = pieList
      }
    } else {
      let newCan = this.state.allList.find(ele => ele.name === name);
      this.state.added.push(newCan);
      newCan.mode = mode;
      updatedPieList = [...pieList, newCan]
    }
    this.setState({
      pieList: updatedPieList
    })
  }


  deleteCan = (eleInAll, eleInPie) => {
    if (eleInAll) {
      const updatedAllList = this.state.allList.filter(e => e.id !== eleInAll.id);
      this.setState({ allList: updatedAllList })
      axios.delete(`https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sirius-all/${eleInAll.id}`)
    }
    if (eleInPie) {
      const updatedPieList = this.state.pieList.filter(e => e.id !== eleInPie.id);
      this.setState({ pieList: updatedPieList })
      axios.delete(`https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/sirius-standup/${eleInPie.id}`)
    }
  }

  addCan = (newCan) => {
    const updatedAllList = [...this.state.allList, newCan]
    this.setState({
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
      <div className="app">
        <LeftBox
          mode={this.state.mode}
          allList={this.state.allList}
          pieList={this.state.pieList}
          reSetElementList={this.reSetElementList}
          deleteCan={this.deleteCan}
          addCan={this.addCan}
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
