import { combineReducers } from 'redux';
import { SET_SQUARE_STATE, UPDATE_SQUARE_STATE, SET_SIZE } from './actions';

const initialState = {
  squares: [
    [2, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 3]
  ],
  size: 5,
  squareState: 0,
  startX: 0,
  startY: 0,
  endX: 4,
  endY: 4
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIZE: {
      const newSquares = [];

      for (let x = 0; x < action.size; x++) {
        const newRow = [];
        for (let y = 0; y < action.size; y++) {
          if (state.squares[x] && state.squares[x][y]) {
            newRow[y] = state.squares[x][y] ? state.squares[x][y] : 0;
          } else {
            newRow[y] = 0;
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

      if (state.squareState === 2 &&
          newSquares[state.startX] &&
          newSquares[state.startX][state.startY]) {
        newSquares[state.startX][state.startY] = 0;
      }

      if (state.squareState === 3 &&
          newSquares[state.endX] &&
          newSquares[state.endX][state.endY]) {
        newSquares[state.endX][state.endY] = 0;
      }

      newSquares[action.x][action.y] = state.squareState;

      return {
        ...state,
        squares: newSquares,
        startX: state.squareState === 2 ? action.x : state.startX,
        startY: state.squareState === 2 ? action.y : state.startY,
        endX: state.squareState === 3 ? action.x : state.endX,
        endY: state.squareState === 3 ? action.y : state.endY
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  app
});
