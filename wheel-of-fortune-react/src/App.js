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
    originCandidate: []
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
        this.setState({ originCandidate: pieList })
      })

    axios.get('https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api/colors')
      .then(res => {
        const colorsList = res.data;
        this.setState({ colorsList: colorsList })
      })

  }

  reSetElementList = (id) => {
    console.log(id)

    const updatedPieList = this.state.pieList.filter(ele => ele.id === id).length > 0 ? (
      this.state.pieList.filter(ele => {
        return ele.id !== id
      })

    ) : (
        [...this.state.pieList, this.state.allList.find(ele => ele.id === id)]
      )
    this.setState({
      pieList: updatedPieList
    })
    // axios.post
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
      pieEleList: updatedList.sort(() => Math.random() - 0.5)
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
              pieList={this.state.pieList} colorsList={this.state.colorsList}
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
