function checkSquareInSquares(square, squares) {
  return squares.filter(x => x.x === square.x && x.y === square.y).length > 0;
}

function calcG(parentG) {
  return parentG + 1;
}

function calcH(square, endSquare) {
  return Math.abs(square.x - endSquare.x) + Math.abs(square.y - endSquare.y);
}

function calcF(x, y, parentG, endX, endY) {
  const G = calcG(parentG);
  const H = calcH(x, y, endX, endY);

  return G + H;
}

function getAdjacent(curr, squares) {
  const x = curr.x;
  const y = curr.y;
  const adjacent = [];

  // Top
  if (squares[x] && squares[x][y + 1] && squares[x][y + 1].squareState !== 1) adjacent.push(squares[x][y + 1]);

  // Left
  if (squares[x - 1] && squares[x - 1][y] && squares[x - 1][y].squareState !== 1) adjacent.push(squares[x - 1][y]);

  // Botttom
  if (squares[x] && squares[x][y - 1] && squares[x][y - 1].squareState !== 1) adjacent.push(squares[x][y - 1]);

  // Right
  if (squares[x + 1] && squares[x + 1][y] && squares[x + 1][y].squareState !== 1) adjacent.push(squares[x + 1][y]);

  return adjacent;
}

export function step(start, end, current, squares, open, closed) {
  let newSquares = [...squares];
  let newOpen = [...open];
  let newClosed = [...closed];
  let newCurrent;

  /**
   * If no current, use start point
   */

  if (newOpen.length === 0) {
    const g = 0;
    const h = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
    newSquares[start.x][start.y].g = g;
    newSquares[start.x][start.y].h = h;
    newSquares[start.x][start.y].f = g + h;
    newSquares[start.x][start.y].open = true;

    return {
      squares: newSquares,
      current: newCurrent,
      open: [start],
      closed: []
    };
  }

  /**
   * Dealing with current
   */
  
  if (current) {
    // Removing from open list
    newOpen = newOpen.filter(x => !(x.x === current.x && x.y === current.y)); 

    // Dealing with current
    newSquares[current.x][current.y] = {
      ...current,
      open: false,
      closed: true,
      current: false
    };

    // Pushing to closed
    newClosed.push(current);
  }

  /**
   * Getting new current
   */

  newOpen.sort((a, b) => {
    if (a.f > b.f) {
      return 1;
    }

    if (a.f < b.f) {
      return -1;
    }

    return 0;
  });


  // Getting new current
  
  for (let i = 0; i < newOpen.length; i++) {
    if (newOpen[i + 1] && newOpen[i].f === newOpen[i + 1].f) {
      // Getting last added if same
      newCurrent = newOpen[i + 1];
    } else {
      newCurrent = newOpen[i];
      break;
    }
  }

  newCurrent = {
    ...newCurrent,
    current: true,
    parent: current
  };

  newSquares[newCurrent.x][newCurrent.y] = { ...newCurrent };

  /**
   * Calculating adjacent
   */

  const adjacent = [];

  // Top
  if (newSquares[newCurrent.x] &&
      newSquares[newCurrent.x][newCurrent.y + 1] &&
      !newSquares[newCurrent.x][newCurrent.y + 1].closed &&
      newSquares[newCurrent.x][newCurrent.y + 1].squareState !== 1)
    adjacent.push(newSquares[newCurrent.x][newCurrent.y + 1]);

  // Left
  if (newSquares[newCurrent.x - 1] &&
      newSquares[newCurrent.x - 1][newCurrent.y] &&
      !newSquares[newCurrent.x - 1][newCurrent.y].closed &&
      newSquares[newCurrent.x - 1][newCurrent.y].squareState !== 1)
    adjacent.push(newSquares[newCurrent.x - 1][newCurrent.y]);

  // Botttom
  if (newSquares[newCurrent.x] &&
      newSquares[newCurrent.x][newCurrent.y - 1] &&
      !newSquares[newCurrent.x][newCurrent.y - 1].closed &&
      newSquares[newCurrent.x][newCurrent.y - 1].squareState !== 1)
    adjacent.push(newSquares[newCurrent.x][newCurrent.y - 1]);

  // Right
  if (newSquares[newCurrent.x + 1] &&
      newSquares[newCurrent.x + 1][newCurrent.y] &&
      !newSquares[newCurrent.x + 1][newCurrent.y].closed &&
      newSquares[newCurrent.x + 1][newCurrent.y].squareState !== 1)
    adjacent.push(squares[newCurrent.x + 1][newCurrent.y]);

  // Calculate adjacent ghf
  adjacent.forEach(square => {
    // Update open list
    if (!square.open && !square.closed) {
      const g = newCurrent.g + 1;
      const h = Math.abs(square.x - end.x) + Math.abs(square.y - end.y);
      const f = g + h;

      const newSquare = { ...square, g, h, f, open: true, parent: current };
      newSquares[newSquare.x][newSquare.y] = newSquare;

      newOpen.push(newSquare);
    }

    if (square.open && !square.closed) {
      // Update f if lower f
      const g = newCurrent.g + 1;
      const h = Math.abs(square.x - end.x) + Math.abs(square.y - end.y);
      const f = g + h;

      if (f < square.f) {
        // Update square and its parent
         
        const newSquare = { ...square, g, h, f, parent: newCurrent };

        newSquares[newSquare.x][newSquare.y] = newSquare;
      }
    }
  });

  return {
    squares: newSquares,
    current: newCurrent,
    open: newOpen,
    closed: newClosed
  };
}

export default function aStar(squares, start, end) {
  let newSquares = [...squares];
  let newCurrent;
  let newOpen = [];
  let newClosed = [];

  do {
    const result = step(start, end, newCurrent, newSquares, newOpen, newClosed);
    squares = result.squares;
    newCurrent = result.current;
    newOpen = [...result.open];
    newClosed = [...result.closed];

    // End Loop if found end square
    if (newCurrent && newCurrent.x === end.x && newCurrent.y === end.y) {
      break;
    }
  } while (newOpen.length > 0);

  return {
    squares: newSquares,
    open: newOpen,
    closed: newClosed,
    current: newCurrent
  };
}
