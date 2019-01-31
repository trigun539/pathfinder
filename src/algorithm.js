export default function aStar(squares, startSquare, endSquare) {
  let count = 0;

  // Calculate G, H, F for start square
  const g = 0; 
  const h = calcH(startSquare, endSquare); 
  const f = g + h;

  squares[startSquare.x][startSquare.y].g = 0;
  squares[startSquare.x][startSquare.y].h = h;
  squares[startSquare.x][startSquare.y].f = f;

  // Adding starting point to open list
  let openList = [startSquare];
  let closedList = [];

  do {
    count++;
    // Prevent stack overflow:
    if (count === 1000) {
      console.log('Breaking due to overflow');
      break;
    }
   
    // Sort open list by Lowest F score
    openList.sort((a, b) => {
      if (a.f > b.f) {
        return 1;
      }

      if (a.f < b.f) {
        return -1;
      }

      return 0;
    });

    // Current square is the square with lowest F score on open list
    const currentSquare = openList[0];

    // Add current square to closed list
    closedList.push(currentSquare);

    // Remove current square from open list
    openList = openList.filter(x => {
      return !(x.x === currentSquare.x && x.y === currentSquare.y);
    });

    // Break loop if we found the path
    if (checkSquareInSquares(endSquare, closedList)) {
      break;
    }

    // Get all adjacent squares
    const adjacent = getAdjacent(currentSquare, squares);

    for (let i = 0; i < adjacent.length; i++) {
      const g = calcG(currentSquare.g);
      const h = calcH(adjacent[i], endSquare);
      const f = g + h;

      // Check if in closed list
      if (checkSquareInSquares(adjacent[i], closedList)) {
        continue;
      }

      // Check if open list, if not open list, add it to open
      if (!checkSquareInSquares(adjacent[i], openList)) {
        adjacent[i].g = g;
        adjacent[i].h = h;
        adjacent[i].f = g + h;

        openList.push(adjacent[i]);
      } else {
        // If on open list, recalculate F. Could be better path
        if (f < adjacent[i].f) {
          openList.forEach((x, k) => {
            if (x.x == adjacent[i].x && x.y == adjacent[i].y) {
              openList[k].g = g;
              openList[k].h = h;
              openList[k].f = f;
            }
          });
        }
      }
    }

    // Remove duplicates of lowest f score, only follow first added
    // openList = openList.filter((value, index, self) => {
    //   return self.map(x => x.f).indexOf(value.f) === index;
    // });

    // Continue the loop, until open list is empty
  } while (openList.length != 0);

  // The path
  return closedList;
}

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
