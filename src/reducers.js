import { combineReducers } from 'redux';
import algoritm, { step } from './algorithm';
import { SET_SQUARE_STATE, UPDATE_SQUARE_STATE, SET_SIZE, RUN, CLEAR, STEP } from './actions';

const size = 20;
const squares = [];

for (let x = 0; x < size; x++) {
  const row = [];
  for (let y = 0; y < size; y++) {
    row.push({
      x,
      y,
      squareState: 0,
      f: 0,
      g: 0,
      h: 0,
      current: false,
      open: false,
      closed: false,
      path: false,
      parent: {}
    });
  }

  squares.push(row);
}

const initialState = {
  squares,
  size,
  squareState: 0,
  start: null,
  end: null,
  current: null,
  open: [],
  closed: []
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIZE: {
      const newSquares = [];

      for (let x = 0; x < action.size; x++) {
        const newRow = [];
        for (let y = 0; y < action.size; y++) {
          if (state.squares[x] && state.squares[x][y]) {
            newRow[y] = state.squares[x][y] ? state.squares[x][y] : { x, y, f: 0, h: 0, g: 0, squareState: 0 };
          } else {
            newRow[y] = {
              x,
              y,
              f: 0,
              g: 0,
              h: 0,
              squareState: 0,
              current: false,
              open: false,
              closed: false
            };
          }
        }
        newSquares.push(newRow);
      }

      return {
        ...state,
        squares: newSquares,
        size: action.size
      };
    }
    case SET_SQUARE_STATE: {
      return {
        ...state,
        squareState: action.squareState
      };
    }
    case UPDATE_SQUARE_STATE: {
      const newSquares = [...state.squares];
      const newState = {
        ...state
      };

      if (state.squareState === 2 && state.start && newSquares[state.start.x] && newSquares[state.start.x][state.start.y]) {
        // Erase old start
        newSquares[state.start.x][state.start.y].squareState = 0;
      }

      if (state.squareState === 2) {
        // Update start square
        newState.start = state.squares[action.x][action.y];
      }

      if (state.squareState === 3 && state.end && newSquares[state.end.x] && newSquares[state.end.x][state.end.y]) {
        newSquares[state.end.x][state.end.y].squareState = 0;
      }

      if (state.squareState === 3) {
        // Update end square
        newState.end = state.squares[action.x][action.y];
      }

      // Update the square
      newSquares[action.x][action.y].squareState = state.squareState;

      // Updated squares state
      newState.squares = newSquares;

      return newState;
    }
    case RUN: {
      const backwardSquares = [];
      for (let x = 0; x < state.size; x++) {
        const row = [];
        for (let y = 0; y < state.size; y++) {
          row.push({
            ...state.squares[x][y]
          });
        }
        backwardSquares.push(row);
      }
      const result = algoritm(state.squares, state.start, state.end);
      const backwards = algoritm(backwardSquares, { ...state.end }, { ...state.start });


      for (let x = 0; x < state.size; x++) {
        for (let y = 0; y < state.size; y++) {
          if (backwards.squares[x][y].closed && result.squares[x][y].closed) {
            result.squares[x][y] = {
              ...result.squares[x][y],
              closed: false,
              path: true
            };
          } else if (backwards.squares[x][y].closed) {
            result.squares[x][y] = {
              ...result.squares[x][y],
              closed: true
            };
          }
        }
      }

      return {
        ...state,
        squares: result.squares,
        open: result.open,
        closed: result.closed,
        current: result.current
      };
    }
    case CLEAR: {
      const newSquares = [];

      for (let x = 0; x < state.size; x++) {
        const row = [];
        for (let y = 0; y < state.size; y++) {
          row.push({
            x,
            y,
            squareState: 0,
            f: 0,
            g: 0,
            h: 0,
            current: false,
            open: false,
            closed: false
          });
        }

        newSquares.push(row);
      }

      return {
        ...state,
        squares: newSquares,
        open: [],
        closed: []
      };
    }
    case STEP: {
      const newStepVals = step(state.start, state.end, state.current, state.squares, state.open, state.closed);

      return {
        ...state,
        squares: newStepVals.squares,
        current: newStepVals.current,
        open: newStepVals.open,
        closed: newStepVals.closed
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  app
});
