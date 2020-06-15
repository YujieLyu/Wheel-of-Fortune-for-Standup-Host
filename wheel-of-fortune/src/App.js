import React, { Component } from 'react';

import LeftBox from './LeftBox/ElementList';
import MidBox from './MidBox/Pie';
import RightBox from './RightBox/index'

class App extends Component {
  state = {
    candidatesList: [
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' }
    ],
    pieEleList: [
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' }
    ],
    // candidateEleList: [
    //   { id: 0, name: 'Adi' },
    //   { id: 1, name: 'Alex' },
    //   { id: 2, name: 'Brady' },
    //   { id: 3, name: 'DD' },
    //   { id: 4, name: 'Jason' }
    // ]
  }

  reSetElementList = (id) => {
    console.log(id)

    const updatedElementList = this.state.pieEleList.filter(ele => ele.id === id).length > 0 ? (
      this.state.pieEleList.filter(ele => {
        return ele.id !== id
      })

    ) : (
        [...this.state.pieEleList, this.state.candidatesList.find(ele => ele.id === id)]

      )
    this.setState({
      pieEleList: updatedElementList
    })
  }

  addElement = (newEle) => {
    newEle.id=this.state.candidatesList.length;
    let updatedPieEleList = [...this.state.pieEleList, newEle];
    let updatedCanElList = [...this.state.candidatesList, newEle];
    this.setState({
      pieEleList: updatedPieEleList,
      candidatesList: updatedCanElList
    })
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm">
            <LeftBox elementList={this.state.candidatesList} reSetElementList={this.reSetElementList} addElement={this.addElement} />
          </div>
          <div className="col-sm">
            <MidBox elementList={this.state.pieEleList} />
          </div>
          <div className="col-sm">
            <RightBox />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
