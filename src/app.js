import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from './components/board';
import { setSquareState, updateSquareState, setSize, run, clear, step } from './actions';

class App extends Component {
  render() {
    const { squares, setSquareState, updateSquareState, setSize, run, clear, step } = this.props;
    const boardProps = {
      squares,
      squareClick(x, y) {
        updateSquareState(x, y);
      }
    };

    const sizeOptionsHTML = [];

    sizeOptionsHTML.push(
      <option key="5" value="5">
        5
      </option>
    );

    for (let x = 10; x <= 50; x += 10) {
      sizeOptionsHTML.push(
        <option key={x} value={x}>
          {x}
        </option>
      );
    }

    return (
      <div>
        <h1>Pathfinder</h1>
        <h2>A* algorithm example</h2>
        <Board {...boardProps} />
        <button
          onClick={() => {
            setSquareState(2);
          }}>
          Set start
        </button>
        <button
          onClick={() => {
            setSquareState(3);
          }}>
          Set end
        </button>
        <button
          onClick={() => {
            setSquareState(1);
          }}>
          Set wall
        </button>
        <button
          onClick={() => {
            setSquareState(0);
          }}>
          Clear selection
        </button>
        <select
          onChange={e => {
            setSize(parseInt(e.target.value, 10));
          }}>
          {sizeOptionsHTML}
        </select>
        <button onClick={run}>Run</button>
        <button onClick={step}>Step</button>
        <button onClick={clear}>Clear Board</button>
      </div>
    );
  }
}

App.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.array),
  setSquareState: PropTypes.func,
  updateSquareState: PropTypes.func,
  setSize: PropTypes.func,
  run: PropTypes.func,
  clear: PropTypes.func,
  step: PropTypes.func
};

App.defaultProps = {
  squares: [[0, 0], [0, 0]],
  setSquareState() {},
  updateSquareState() {},
  setSize() {},
  run() {},
  clear() {},
  step() {}
};

const mapStateToProps = state => {
  return {
    squares: state.app.squares
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSize(size) {
      dispatch(setSize(size));
    },
    setSquareState(squareState) {
      dispatch(setSquareState(squareState));
    },
    updateSquareState(x, y) {
      dispatch(updateSquareState(x, y));
    },
    run() {
      dispatch(run());
    },
    clear() {
      dispatch(clear());
    },
    step() {
      dispatch(step());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
