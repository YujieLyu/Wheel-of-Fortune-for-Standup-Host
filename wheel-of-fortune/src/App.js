import React, { Component } from 'react';

import LeftBox from './sectionComponents/LeftBox';
import MidBox from './sectionComponents/MidBox';
import RightBox from './sectionComponents/RightBox'

class App extends Component {
  state = {
    originEleList: [
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' }
    ],
    dynamicEleList:[
      { id: 0, name: 'Adi' },
      { id: 1, name: 'Alex' },
      { id: 2, name: 'Brady' },
      { id: 3, name: 'DD' },
      { id: 4, name: 'Jason' }
    ]
  }

  reSetElementList = (id) => {
    console.log(id)
    const updatedElementList = this.state.dynamicEleList.filter(ele => {
      return ele.id !== id

    });
    this.setState({
      dynamicEleList: updatedElementList
    })
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm">
            <LeftBox elementList={this.state.originEleList} reSetElementList={this.reSetElementList} />
          </div>
          <div className="col-sm">
            <MidBox elementList={this.state.dynamicEleList} />
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
