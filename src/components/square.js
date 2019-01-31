import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Square extends PureComponent {
  render() {
    const { x, y, f, g, h, squareState, clickHandler, close, open, current } = this.props;
    // Square states
    // 0 = none
    // 1 = wall
    // 2 = start
    // 3 = end

    const closeClass = close && !(squareState === 2 || squareState === 3) ? 'close' : '';
    const openClass = open && !(squareState === 2 || squareState === 3) ? 'open' : '';
    const currentClass = current && !(squareState === 2 || squareState === 3) ? 'current' : '';

    const theClass = `square square-${squareState} ${closeClass} ${openClass} ${currentClass}`;

    return <div className={theClass} onClick={clickHandler} title={`G: ${g} | H: ${h} | F: ${f}`} />;
  }
}

Square.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  g: PropTypes.number,
  h: PropTypes.number,
  f: PropTypes.number,
  squareState: PropTypes.number,
  clickHandler: PropTypes.func,
  open: PropTypes.bool,
  closed: PropTypes.bool,
  current: PropTypes.bool
};

Square.defaultProps = {
  x: 0,
  y: 0,
  g: 0,
  h: 0,
  f: 0,
  squareState: 0,
  open: false,
  closed: false,
  current: false,
  clickHandler() {}
};

export default Square;
