export const SET_SQUARE_STATE = 'SET_SQUARE_STATE';
export const UPDATE_SQUARE_STATE = 'UPDATE_SQUARE_STATE';
export const SET_SIZE = 'SET_SIZE';
export const RUN = 'RUN';
export const CLEAR = 'CLEAR';
export const STEP = 'STEP';

export function setSize(size) {
  return { type: SET_SIZE, size };
}

export function setSquareState(squareState) {
  return { type: SET_SQUARE_STATE, squareState };
}

export function updateSquareState(x, y) {
  return { type: UPDATE_SQUARE_STATE, x, y };
}

export function run() {
  return { type: RUN };
}

export function clear() {
  return { type: CLEAR };
}

export function step() {
  return { type: STEP };
}
