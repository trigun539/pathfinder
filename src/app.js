import React, { Component } from 'react';
import Board from './components/board';

class App extends Component {

  render () {
    const {} = this.props;

    return (
      <div>
        <h1>Pathfinder</h1>
        <Board />
      </div>
    );
  }

}

App.propTypes = {};

export default App;
