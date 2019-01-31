import { combineReducers } from 'redux';
import algoritm from './algorithm';
import { SET_SQUARE_STATE, UPDATE_SQUARE_STATE, SET_SIZE, RUN, CLEAR } from './actions';

const size = 5;
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
      path: false
    }); 
  }

  squares.push(row);
}

const initialState = {
  squares,
  size,
  squareState: 0,
  startX: null,
  startY: null,
  endX: null,
  endY: null
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
              squareState: 0
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

      if (state.squareState === 2 &&
          newSquares[state.startX] &&
          newSquares[state.startX][state.startY]) {
        // Erase old start
        newSquares[state.startX][state.startY].squareState = 0;
      }

      if (state.squareState === 2) {
        // Update start square
        newState.startX = action.x;
        newState.startY = action.y;
      }

      if (state.squareState === 3 &&
          newSquares[state.endX] &&
          newSquares[state.endX][state.endY]) {
        newSquares[state.endX][state.endY].squareState = 0;
      }

      if (state.squareState === 3) {
        // Update end square
        newState.endX = action.x;
        newState.endY = action.y;
      }

      // Update the square
      newSquares[action.x][action.y].squareState = state.squareState;
      
      // Updated squares state
      newState.squares = newSquares;

      return newState;
    }
    case RUN: {
      const path = algoritm(state.squares,
               state.squares[state.startX][state.startY],
               state.squares[state.endX][state.endY]);      

      // const backwardsPath = algoritm(state.squares,
      //          state.squares[state.endX][state.endY],
      //          state.squares[state.startX][state.startY]);      


      // const theFinalPath = getUnion(path, backwardsPath);

      const newSquares = [...state.squares];

      path.forEach(pathSquare => {
        newSquares[pathSquare.x][pathSquare.y] = {
          ...pathSquare,
          path: true
        };
      });

      return {
        ...state,
        squares: newSquares
      };
    }
    case CLEAR: {
      const newSquares = [];

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
            path: false
          }); 
        }

        newSquares.push(row);
      }

      return {
        ...state,
        squares: newSquares
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  app
});
