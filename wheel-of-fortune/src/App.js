import React, { Component } from 'react';
import './default.scss';

import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/RightBox';


class App extends Component {
  state = {
    allElementList: [
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' },
      { id: 5, name: 'Jessie' },
      { id: 6, name: 'Marty' },
      { id: 7, name: 'Matt' },
      { id: 8, name: 'Pras' },
      { id: 9, name: 'Rena' },
      { id: 10, name: 'Rod' }
    ],
    pieEleList: [
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' },
      // { id: 5, name: 'Jessie' },
      // { id: 6, name: 'Marty' },
      // { id: 7, name: 'Matt' },
      { id: 8, name: 'Pras' },
      { id: 9, name: 'Rena' },
      { id: 10, name: 'Rod' }
    ],
    colorsList: [
      '#fd6363',
      '#fa9d5f',
      '#fac248',
      '#f8de6b',
      '#cbf779',
      '#73fdad',
      '#5cfadd',
      '#60c8f8',
      '#60a7f8',
      '#6f71f8',
      '#a27dfa',
      '#c07dfa',
      '#f391fc',
      '#f860be',
      '#f51d9b',

    ]
  }

  reSetElementList = (id) => {
    console.log(id)

    const updatedElementList = this.state.pieEleList.filter(ele => ele.id === id).length > 0 ? (
      this.state.pieEleList.filter(ele => {
        return ele.id !== id
      })

    ) : (
        [...this.state.pieEleList, this.state.allElementList.find(ele => ele.id === id)]

      )
    this.setState({
      pieEleList: updatedElementList
    })
  }

  addElement = (newEle) => {
    newEle.id = this.state.allElementList.length;
    let updatedPieEleList = [...this.state.pieEleList, newEle];
    let updatedCanElList = [...this.state.allElementList, newEle];
    this.setState({
      pieEleList: updatedPieEleList,
      allElementList: updatedCanElList
    })
  }

  shuffleWheel = () => {
    let updatedList = [...this.state.pieEleList];
    this.setState({
      pieEleList: updatedList.sort(() => Math.random() - 0.5)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm">
            <LeftBox elementList={this.state.allElementList}
              reSetElementList={this.reSetElementList}
              addElement={this.addElement}
              checkedList={this.state.pieEleList} />
          </div>
          <div className="col-sm">
            <MidBox pieEleList={this.state.pieEleList} colorList={this.state.colorsList} />
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
