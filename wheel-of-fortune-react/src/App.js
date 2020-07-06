import React, { Component } from 'react';
import './default.scss';
import axios from 'axios';
import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/RightBox';


class App extends Component {

  state = {
    allList: [],
    pieList: [],
    colorsList: [],
  }

  componentDidMount() {
    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/all')
      .then(res => {
        const allList = res.data;
        this.setState({ allList });
      });

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/candidates')
      .then(res => {
        const pieList = res.data;
        this.setState({ pieList });
      })

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/colors')
      .then(res => {
        const colorsList = res.data;
        this.setState({ colorsList })
      })
    console.log(this.state.pieList)
  }

  reSetElementList = (name) => {

    let pieList = [...this.state.pieList];

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

  updateCan = () => {
    this.state.pieList.map(ele => axios.delete('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/delete-can', { data: ele }))
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
              allList={this.state.allList}
              pieList={this.state.pieList}
              reSetElementList={this.reSetElementList}
              addElement={this.addElement}
            />
          </div>
          <div className="col-sm">
            <MidBox
              pieList={this.state.pieList}
              colorsList={this.state.colorsList}
              updateCan={this.updateCan}
            />
          </div>
          <div className="col-sm">
            <RightBox shuffleWheel={this.shuffleWheel} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
