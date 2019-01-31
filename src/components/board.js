import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Square from './square';

class Board extends PureComponent {
  render() {
    const { squares, squareClick } = this.props;

    const rowsHTML = [];

    squares.forEach((rowSquares, x) => {
      const rowSquaresHTML = [];

      rowSquares.forEach((square, y) => {
        const squareProps = {
          ...square,
          clickHandler() {
            squareClick(x, y);
          },
          key: `row-${x}-square-${y}`
        };
        rowSquaresHTML.push(<Square {...squareProps} />);
      });

      rowsHTML.push(
        <div key={`row-${x}`} className="row">
          {rowSquaresHTML}
        </div>
      );
    });

    return <div id="board">{rowsHTML}</div>;
  }
}

Board.propTypes = {
  squareClick: PropTypes.func,
  squares: PropTypes.arrayOf(PropTypes.array)
};

Board.defaultProps = {
  squares: [[0, 0], [0, 0]],
  squareClick() {}
};

export default Board;
