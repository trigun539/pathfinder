import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Square extends PureComponent {
  render() {
    const { x, y, f, g, h, squareState, clickHandler, path } = this.props;
    // Square states
    // 0 = none
    // 1 = wall
    // 2 = start
    // 3 = end

    const pathClass = path && !(squareState === 2 || squareState === 3) ? 'path' : '';

    const theClass = `square square-${squareState} ${pathClass}`;

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
  path: PropTypes.bool
};

Square.defaultProps = {
  x: 0,
  y: 0,
  g: 0,
  h: 0,
  f: 0,
  squareState: 0,
  path: false,
  clickHandler() {}
};

export default Square;
